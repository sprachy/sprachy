import fs from 'fs/promises'
import { remove } from 'lodash-es'

type VQA = {
  id: string,
  imageId: string,
  question: {
    en: string
  }
  answer: {
    en: string
  }
  alternativeAnswers?: string[]
}

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as VQA[]

  filterAmbiguousYesNoQuestions(vqas)
  filterAmbiguousNumericQuestions(vqas)
  filterSportsQuestions(vqas)
  filterGenderQuestions(vqas)

  await fs.writeFile('data/vqas.json', JSON.stringify(vqas, null, 2))
}

function filterAmbiguousYesNoQuestions(vqas: VQA[]) {
  const removed = remove(vqas, v => {
    return (v.answer.en === 'yes' && v.alternativeAnswers?.includes('no'))
      || (v.answer.en === 'no' && v.alternativeAnswers?.includes('yes'))
  })

  console.log(`Removing ${removed.length} ambiguous yes/no questions`)
}

function filterAmbiguousNumericQuestions(vqas: VQA[]) {
  const removed = remove(vqas, v => {
    return v.answer.en.match(/^\d+$/) && v.alternativeAnswers?.some(a => a.match(/^\d+$/))
  })

  console.log(`Removing ${removed.length} ambiguous numeric questions`)
}

function filterSportsQuestions(vqas: VQA[]) {
  const removed = remove(vqas, v => {
    return v.question.en.toLowerCase().match(/football|baseball|tennis/)
  })

  console.log(`Removing ${removed.length} boring sports questions`)
}


function filterGenderQuestions(vqas: VQA[]) {
  const removed = remove(vqas, v => {
    return v.question.en.toLowerCase().match(/man or woman|woman or man|boy or girl|girl or boy|male or female|female or male/)
  })

  console.log(`Removing ${removed.length} subjective gender questions`)
}


main()