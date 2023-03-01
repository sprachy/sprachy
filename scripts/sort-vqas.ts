import fs from 'fs/promises'
import { groupBy, includes, meanBy, sortBy } from 'lodash-es'
import { delay } from '../lib/util'

const cefrLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

type LeveledVQA = TaggedVQA & { cefr: CEFRLevel }

function getLeveledVQA(vqa: TaggedVQA): LeveledVQA | null {
  const validDaflex = vqa.daflex.filter(df => includes(cefrLevels, df.cefr)) as DAFlexResultValid[]

  if (validDaflex.length === 0) {
    return null
  }

  // We define the overall level of the VQA as the highest mean of 
  // the leveled frequencies of the individual lemmas
  const cefrLevelFreqs = cefrLevels.map(cefr => ({
    cefr: cefr,
    frequency: meanBy(validDaflex, df => df.statistics[`freq_${cefr}`])
  }))
  const cefr = sortBy(cefrLevelFreqs, c => 1 / c.frequency)[0].cefr

  return {
    ...vqa,
    cefr
  }
}

async function main() {
  const taggedVQAs = JSON.parse(await fs.readFile('data/tagged-vqas.json', 'utf-8')) as TaggedVQA[]

  // Filter out certain kinds of questions
  // Especially subjective stuff like gender-related questions
  const filteredVQAs = taggedVQAs.filter(vqa => {
    const text = vqa.question.de + ' ' + vqa.answer.de

    if (text.includes("Mann oder eine Frau"))
      return false

    if (text.includes("Frau oder ein Mann"))
      return false

    if (text.includes("männlich oder weiblich"))
      return false

    if (text.includes("weiblich oder männlich"))
      return false

    // Sports is boring
    if (text.includes("Sport") || text.includes("Baseball") || text.includes("Fußball") || text.includes("Tennis"))
      return false

    return true
  })

  const leveledVQAs = filteredVQAs.map(vqa => getLeveledVQA(vqa)).filter(v => v) as LeveledVQA[]

  // How shall we order the VQAs?
  // We want to reinforce understanding of each word by using it in multiple different
  // sequential examples.
  // And we don't want the user to be distracted by trying to learn multiple words at once
  // as much as possible.
  // Therefore, we will select the next VQA from the same level which uses the smallest
  // number of new words.

  const vqasByCEFR = groupBy(leveledVQAs, v => v.cefr)

  const learnedLemmas = new Set()
  const sortedVQAs: LeveledVQA[] = []

  // Let's just start with the shortest VQA for now
  let cefrVQAs = sortBy(vqasByCEFR['A1'], v => 1 / v.question.de.length)
  let nextVQA = cefrVQAs.pop()!
  let i = 0
  while (sortedVQAs.length < leveledVQAs.length) {
    let vqa = nextVQA
    sortedVQAs.push(vqa)

    console.log(vqa.question.de + ' ' + vqa.answer.de)

    for (const df of vqa.daflex) {
      learnedLemmas.add(df.lemma)
    }

    if (cefrVQAs.length === 0) {
      // Finished this level
      const nextCEFR = cefrLevels[cefrLevels.indexOf(vqa.cefr) + 1]
      if (!nextCEFR) {
        // Finished all the levels
        break
      }
      cefrVQAs = vqasByCEFR[nextCEFR]
    }

    // Find the next VQA which uses the smallest number of new words
    cefrVQAs = sortBy(cefrVQAs, v => {
      const lemmas = v.daflex.filter(df => df.cefr !== 'IGNORED')
      const newLemmas = lemmas.filter(df => !learnedLemmas.has(df.lemma))

      const freq = meanBy(newLemmas, df => df.statistics ? df.statistics[`freq_${v.cefr}`] : 0)

      return [1 / (newLemmas.length / lemmas.length), 1 / freq]
    })

    nextVQA = cefrVQAs.pop()!

    i += 1
    if (i % 100 === 0) {
      console.log(`${i} / ${leveledVQAs.length}`)
    }
  }

  await fs.writeFile('data/sorted-vqas.json', JSON.stringify(sortedVQAs, null, 2))
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
