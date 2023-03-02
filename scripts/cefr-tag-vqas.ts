import fs from 'fs/promises'
import { chunk, groupBy, keyBy } from 'lodash-es'
import { titleCase } from '../lib/languageUtil'
import http from '../server/http'

type TranslatedVQA = PartialVQA & {
  question: {
    en: string,
    de: string
  }
  answer: {
    en: string,
    de: string
  }
}

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]
  const lemmas = JSON.parse(await fs.readFile('data/lemmas.json', 'utf-8')) as Lemma[]
  const vqasNeedingTag = vqas.filter(v => v.question.de && v.answer.de && (!v.cefr || !v.tokens)) as TranslatedVQA[]

  const lemmaLookup = keyBy(lemmas, l => l.lemma)

  // Group them by image so we do all VQAs on the same image together
  // The context might help the tagger
  const vqasByImage = groupBy(vqasNeedingTag, 'imageId')

  const totalToTag = vqasNeedingTag.length
  let amountTagged = 0

  for (const batch of chunk(Object.values(vqasByImage), 10)) {
    // We do 10 image groups at a time for speed

    let text = ''
    for (const imageVQAs of batch) {
      for (const vqa of imageVQAs) {
        text += vqa.question.de + ' ' + titleCase(vqa.answer.de) + '. END\n'
      }
      text += '\n'
    }

    const response = await http.post('https://cental.uclouvain.be/cefrlex/daflex/analyse/', {
      resource: "DAFlex",
      tagger: "TreeTagger - German",
      user_text: text,
      version: "First observation"
    })
    const json = await response.json()
    for (const result of json) {
      result.statistics = JSON.parse(result.statistics)
    }
    const daflex: DAFlexResult[] = json

    // Now we need to line up the DAFlex results with the VQAs
    const batchVQAs = batch.flat()
    let vqaIndex = 0
    let collectedResults: DAFlexResult[] = []
    for (const result of daflex) {
      if (result.token !== 'END') {
        collectedResults.push(result)

        let lemma = lemmaLookup[result.lemma]

        if (!lemma) {
          lemma = { lemma: result.lemma }
          lemmas.push(lemma)
        }

        if (result.statistics) {
          lemma.statistics = result.statistics
        }
      }
      if (result.token === 'END' || result === daflex[daflex.length - 1]) {
        const vqa = batchVQAs[vqaIndex]
        vqa.tokens = collectedResults.map(r => {
          return {
            token: r.token,
            lemma: r.lemma,
            pos: r.pos
          }
        })
        amountTagged += 1
        vqaIndex++
        collectedResults = []
      }
    }

    await fs.writeFile('data/vqas.json', JSON.stringify(vqas, null, 2))
    console.log(`${amountTagged} / ${vqas.length}`)
  }
}

main()