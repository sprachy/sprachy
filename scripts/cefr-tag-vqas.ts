import fs from 'fs/promises'
import { chunk, groupBy } from 'lodash-es'
import { titleCase } from '../lib/languageUtil'
import http from '../server/http'

async function getTaggedVQAs() {
  // So we can resume where we left off
  try {
    return JSON.parse(await fs.readFile('data/tagged-vqas.json', 'utf-8'))
  } catch (err) {
    return []
  }
}

async function main() {
  const taggedVQAs = await getTaggedVQAs()
  const vqas = JSON.parse(await fs.readFile('data/translated-vqas.json', 'utf-8')) as TranslatedVQA[]

  const remainingVQAs = vqas.slice(taggedVQAs.length)

  // Group them by image so we do all VQAs on the same image together
  // The context might help the tagger
  const vqasByImage = groupBy(remainingVQAs, 'imageId')

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
      collectedResults.push(result)
      if (result.token === 'END' || result === daflex[daflex.length - 1]) {
        taggedVQAs.push({
          ...batchVQAs[vqaIndex],
          daflex: collectedResults
        })
        vqaIndex++
        collectedResults = []
      }
    }

    await fs.writeFile('data/tagged-vqas.json', JSON.stringify(taggedVQAs, null, 2))
    console.log(`${taggedVQAs.length} / ${vqas.length}`)
  }
}

main()