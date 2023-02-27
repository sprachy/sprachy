import fs from 'fs/promises'

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
    await fs.readFile('data/v2_OpenEnded_mscoco_val2014_questions.json', 'utf-8'))
  const annotationsDataset: VQAAnnotationsDataset = JSON.parse(await fs.readFile('data/v2_mscoco_val2014_annotations.json', 'utf-8'))

  const vqas: any[] = []

  for (let i = 0; i < vqaDataset.questions.length; i++) {
    const origVQA = vqaDataset.questions[i]
    const annotation = annotationsDataset.annotations[i]

    const question = {
      questionId: origVQA.question_id,
      imageId: origVQA.image_id,
      question: origVQA.question,
      answer: annotation.multiple_choice_answer
    }

    vqas.push(question)

    if (i % 1000 === 0) {
      console.log(`${i} / ${vqaDataset.questions.length}`)
    }
  }

  await fs.writeFile('data/untranslated-vqas.json', JSON.stringify(vqas, null, 2))
}

main()