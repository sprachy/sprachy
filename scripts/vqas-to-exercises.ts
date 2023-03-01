import fs from 'fs/promises'
import { groupBy, sampleSize, sortBy, uniq, uniqBy } from 'lodash-es'
import type { VQAExercise } from '../lib/types'
import { getMultipleChoiceAnswerType, numToWord } from '../lib/languageUtil'

type TranslatedVQA = {
  questionId: number
  imageId: number
  question: {
    en: string
    de: string
  }
  answer: {
    en: string
    de: string
  }
}

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/translated-vqas.json', 'utf-8')) as TranslatedVQA[]

  const annotatedVQAs = vqas.map(v => {
    return {
      ...v,
      answerType: getMultipleChoiceAnswerType(v.question.en + ' ' + v.answer.en)
    }
  })

  const allAnswerTypes = uniq(annotatedVQAs.map(vqa => vqa.answerType))
  const vqasByAnswerType = groupBy(annotatedVQAs, (vqa) => vqa.answerType)
  const possibleAnswersByType: Record<string, TranslatedVQA['answer'][]> = {}
  for (const type of allAnswerTypes) {
    possibleAnswersByType[type] = uniqBy(vqasByAnswerType[type].map(vqa => vqa.answer), a => a.en)
  }

  let i = 0
  const exercises: VQAExercise[] = annotatedVQAs.map((vqa) => {
    const answer = { en: vqa.answer.en, de: vqa.answer.de, correct: true }
    const possibleWrongAnswers = possibleAnswersByType[vqa.answerType].filter((answer) => answer.en !== vqa.answer.en)
    const wrongAnswers = sampleSize(possibleWrongAnswers, 3).map(ans => ({ en: ans.en, de: ans.de, correct: false }))

    if (vqa.answerType === 'numeric') {
      answer.de = numToWord(parseInt(answer.en))
      for (const ans of wrongAnswers) {
        ans.de = numToWord(parseInt(ans.en))
      }
    }

    i += 1
    if (i % 100 === 0) {
      console.log(`${i} / ${vqas.length}`)
    }

    return {
      questionId: vqa.questionId,
      imageId: vqa.imageId,
      question: vqa.question,
      choices: sortBy([
        answer,
        ...wrongAnswers
      ], c => c.de)
    }
  })

  await fs.writeFile('data/vqa-exercises.json', JSON.stringify(exercises, null, 2))
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
