import fs from 'fs/promises'
import { groupBy, sampleSize, sortBy, uniq, uniqBy } from 'lodash-es'
import { getMultipleChoiceAnswerType, numToWord } from '../lib/nlp'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]
  const translatedVQAs = vqas.filter(v => v.answer.de) as TranslatedVQA[]

  for (const v of translatedVQAs) {
    v.answerType = getMultipleChoiceAnswerType(v.question.en + ' ' + v.answer.en)
  }

  const allAnswerTypes = uniq(translatedVQAs.map(v => v.answerType!))
  const vqasByAnswerType = groupBy(translatedVQAs, v => v.answerType)
  const possibleAnswersByType: Record<string, TranslatedVQA['answer'][]> = {}
  for (const type of allAnswerTypes) {
    possibleAnswersByType[type] = uniqBy(vqasByAnswerType[type].map(vqa => vqa.answer), a => a.en)
  }

  let i = 0
  for (const vqa of translatedVQAs) {
    // console.log(vqa.question.de + ' ' + vqa.answer.de)
    const answer = { en: vqa.answer.en, de: vqa.answer.de, correct: true }
    const possibleWrongAnswers = possibleAnswersByType[vqa.answerType!].filter((answer) => answer.en !== vqa.answer.en)
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

    vqa.choices = sortBy([
      answer,
      ...wrongAnswers
    ], c => c.de)
  }

  await fs.writeFile('data/vqas.json', JSON.stringify(vqas, null, 2))
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
