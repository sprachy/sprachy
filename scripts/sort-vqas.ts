import fs from 'fs/promises'
import { groupBy, keyBy, meanBy, sortBy } from 'lodash-es'

const cefrLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]
  const allLemmas = JSON.parse(await fs.readFile('data/lemmas.json', 'utf-8')) as Lemma[]
  const lemmasByLemma = keyBy(allLemmas, l => l.lemma)
  const translatedVQAs = vqas.filter(v => v.question.de && v.answer.de)

  function findCEFRLevel(vqa: PartialVQA): CEFRLevel | undefined {
    // Need to come back to this; for now, just use the first level
    return 'A1'

    // if (!vqa.tokens || !vqa.tokens.length)
    //   return undefined

    // const nonPunctuationTokens = vqa.tokens.filter(t => t.token.match(/^[a-zäöüß]+$/i))
    // const lemmas = nonPunctuationTokens.map(t => lemmasByLemma[t.lemma])

    // let lemmaCefrs = []
    // for (const l of lemmas) {
    //   for (const cefr of cefrLevels) {
    //     if (!l || l.statistics[`freq_${cefr}`] > 0) {
    //       lemmaCefrs.push(cefr)
    //       break
    //     }
    //     lemmaCefrs.push('C2')
    //   }
    // }

    // for (const cefr of cefrLevels) {
    //   if (lemmaCefrs.every(c => c <= cefr)) {
    //     return cefr
    //   }
    // }
  }

  for (const v of translatedVQAs) {
    v.cefr = findCEFRLevel(v)
  }

  // How shall we order the VQAs?
  // We want to reinforce understanding of each word by using it in multiple different
  // sequential examples.
  // And we don't want the user to be distracted by trying to learn multiple words at once
  // as much as possible.
  // Therefore, we will select the next VQA from the same level which uses the smallest
  // number of new words.

  const vqasByCEFR = groupBy(translatedVQAs, v => v.cefr)
  const totalVQAsWithCEFR = translatedVQAs.filter(v => v.cefr).length

  const learnedLemmas = new Set()
  let sortedVQAs: PartialVQA[] = []

  // Let's just start with the shortest VQA for now
  let cefrVQAs = sortBy(vqasByCEFR['A1'], v => 1 / v.question.de!.length)
  let nextVQA = cefrVQAs.pop()!
  let i = 0
  while (true) {
    let vqa = nextVQA
    sortedVQAs.push(vqa)

    for (const t of vqa.tokens!) {
      learnedLemmas.add(t.lemma)
    }

    if (cefrVQAs.length === 0) {
      // Finished this level
      const nextCEFR = cefrLevels[cefrLevels.indexOf(vqa.cefr!) + 1]
      if (!nextCEFR || !vqasByCEFR[nextCEFR]) {
        // Finished all the levels
        break
      }
      cefrVQAs = vqasByCEFR[nextCEFR]
    }

    // Find the next VQA which uses the smallest number of new words
    cefrVQAs = sortBy(cefrVQAs, v => {
      const nonPunctuationTokens = v.tokens!.filter(t => t.token.match(/^[a-zäöüß]+$/i))
      const lemmas = nonPunctuationTokens.map(t => t.lemma)
      const newLemmas = lemmas.filter(l => !learnedLemmas.has(l))

      // Tiebreaker: favor introducing more frequent words first
      const freq = meanBy(newLemmas, l => {
        const lemma = lemmasByLemma[l]
        return lemma?.statistics ? lemma.statistics[`freq_total`] : 0
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
