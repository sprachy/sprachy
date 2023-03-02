import fs from 'fs/promises'
import { chunk, groupBy, keyBy } from 'lodash-es'
import { titleCase } from '../lib/languageUtil'
import http from '../server/http'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]
  const lemmas = JSON.parse(await fs.readFile('data/lemmas.json', 'utf-8')) as Lemma[]

  const taggedVQAs = JSON.parse(await fs.readFile('rawdata/tagged-vqas.json', 'utf-8')) as TaggedVQA[]

  const vqaById = keyBy(vqas, 'id')
  const lemmaLookup = keyBy(lemmas, l => l.lemma)

  for (const tv of taggedVQAs) {
    const vqa = vqaById[tv.questionId]
    if (!vqa) continue

    vqa.tokens = tv.daflex.map(r => {
      if (r.statistics) {
        let lemma = lemmaLookup[r.lemma]
        if (!lemma) {
          lemma = { lemma: r.lemma }
          lemmas.push(lemma)
        }
        lemma.statistics = r.statistics
      }

      return {
        token: r.token,
        lemma: r.lemma,
        pos: r.pos
      }
    })
  }

  await fs.writeFile('data/vqas.json', JSON.stringify(vqas, null, 2))
  await fs.writeFile('data/lemmas.json', JSON.stringify(lemmas, null, 2))
}

main()