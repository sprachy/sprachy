import fs from 'fs/promises'
import { sortBy, uniq } from 'lodash-es'

type VQADataset = {
  info: {
    description: string
    url: string
    version: string
    year: number
    contributor: string
    date_created: string
  }
  license: {
    url: string
    name: string
  }
  data_type: string
  data_subtype: string
}

type VQAQuestionsDataset = VQADataset & {
  task_type: string
  questions: {
    image_id: number
    question: string
    question_id: number
  }[]
}

type VQAAnnotationsDataset = VQADataset & {
  annotations: {
    question_type: string
    multiple_choice_answer: string
    image_id: number
    answer_type: string
    question_id: number
    answers: {
      answer: string
      answer_confidence: string
      answer_id: number
    }[]
  }[]
}

async function main() {
  const vqaDataset: VQAQuestionsDataset = JSON.parse(
    await fs.readFile('rawdata/v2_OpenEnded_mscoco_val2014_questions.json', 'utf-8'))
  const annotationsDataset: VQAAnnotationsDataset = JSON.parse(await fs.readFile('rawdata/v2_mscoco_val2014_annotations.json', 'utf-8'))

  const vqas: any[] = []

  for (let i = 0; i < vqaDataset.questions.length; i++) {
    const origVQA = vqaDataset.questions[i]
    const annotation = annotationsDataset.annotations[i]

    const answers = annotation.answers.map(a => a.answer)
    const uniqAnswers = uniq(answers).filter(a => a !== annotation.multiple_choice_answer)
    const alternatives = sortBy(uniqAnswers, a => answers.filter(a2 => a2 === a).length).reverse()

    const question = {
      questionId: origVQA.question_id,
      imageId: origVQA.image_id,
      question: {
        en: origVQA.question
      },
      answer: {
        en: annotation.multiple_choice_answer
      },
      alternativeAnswers: alternatives.length ? alternatives : undefined
    }

    vqas.push(question)

    if (i % 1000 === 0) {
      console.log(`${i} / ${vqaDataset.questions.length}`)
    }
  }

  await fs.writeFile('rawdata/untranslated-vqas.json', JSON.stringify(vqas, null, 2))
}

main()