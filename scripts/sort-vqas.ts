import fs from 'fs/promises'
import { groupBy, includes, keyBy, meanBy, sortBy } from 'lodash-es'
import { delay } from '../lib/util'

const cefrLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]
  const lemmas = JSON.parse(await fs.readFile('data/lemmas.json', 'utf-8')) as Lemma[]
  const lemmasByLemma = keyBy(lemmas, l => l.lemma)

  function findCEFRLevel(vqa: PartialVQA): CEFRLevel | undefined {
    if (!vqa.tokens || !vqa.tokens.length)
      return undefined

    const lemmas = vqa.tokens.map(t => lemmasByLemma[t.lemma]).filter(l => l?.statistics)

    // We define the overall level of the VQA as the highest mean of 
    // the leveled frequencies of the individual lemmas
    const cefrLevelFreqs = cefrLevels.map(cefr => ({
      cefr: cefr,
      frequency: meanBy(lemmas, l => l.statistics![`freq_${cefr}`])
    }))
    const cefr = sortBy(cefrLevelFreqs, c => 1 / c.frequency)[0].cefr

    return cefr
  }

  for (const v of vqas) {
    v.cefr = findCEFRLevel(v)
  }

  // How shall we order the VQAs?
  // We want to reinforce understanding of each word by using it in multiple different
  // sequential examples.
  // And we don't want the user to be distracted by trying to learn multiple words at once
  // as much as possible.
  // Therefore, we will select the next VQA from the same level which uses the smallest
  // number of new words.

  const vqasByCEFR = groupBy(vqas, v => v.cefr)
  const totalVQAsWithCEFR = vqas.filter(v => v.cefr).length

  const learnedLemmas = new Set()
  let sortedVQAs: PartialVQA[] = []

  // Let's just start with the shortest VQA for now
  let cefrVQAs = sortBy(vqasByCEFR['A1'], v => 1 / v.question.de!.length)
  let nextVQA = cefrVQAs.pop()!
  let i = 0
  while (true) {
    let vqa = nextVQA
    sortedVQAs.push(vqa)

    console.log(vqa.question.de + ' ' + vqa.answer.de)

    for (const t of vqa.tokens!) {
      learnedLemmas.add(t.lemma)
    }

    if (cefrVQAs.length === 0) {
      // Finished this level
      const nextCEFR = cefrLevels[cefrLevels.indexOf(vqa.cefr!) + 1]
      if (!nextCEFR) {
        // Finished all the levels
        break
      }
      cefrVQAs = vqasByCEFR[nextCEFR]
    }

    // Find the next VQA which uses the smallest number of new words
    cefrVQAs = sortBy(cefrVQAs, v => {
      const lemmas = v.tokens!.map(t => t.lemma)
      const newLemmas = lemmas.filter(l => !learnedLemmas.has(l))

      const freq = meanBy(newLemmas, l => {
        const lemma = lemmasByLemma[l]
        return lemma?.statistics ? lemma.statistics[`freq_${v.cefr!}`] : 0
      })

      return [1 / (newLemmas.length / lemmas.length), 1 / freq]
    })

    nextVQA = cefrVQAs.pop()!

    i += 1
    if (i % 100 === 0) {
      console.log(`${i} / ${totalVQAsWithCEFR}`)
    }
  }

  // Stick anything without a level on the end
  sortedVQAs = sortedVQAs.concat(vqas.filter(v => !v.cefr))

  await fs.writeFile('data/vqas.json', JSON.stringify(sortedVQAs, null, 2))
}

main()

      // For questions where the answer is a number, we can generate the wrong
      // answers as other numbers

      // const num = parseInt(vqa.answer.en)
      // answer = { en: vqa.answer.en, de: numToWord(num), correct: true }

      // for (let i = 0; i < 3; i++) {
      //   let wrongNum = num
      //   while (wrongNum === num) {
      //     wrongNum += random(Math.max(-10, -num), Math.max(num, 9))
      //   }
      //   wrongAnswers.push({ en: wrongNum.toString(), de: numToWord(wrongNum), correct: false })
      // }
