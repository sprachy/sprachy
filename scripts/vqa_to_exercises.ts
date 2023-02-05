import fs from 'fs/promises'
import { uniq, sampleSize, shuffle } from 'lodash-es'

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
  const questionsDataset: VQAQuestionsDataset = JSON.parse(
    await fs.readFile('data/v2_OpenEnded_mscoco_val2014_questions.json', 'utf-8'))
  const annotationsDataset: VQAAnnotationsDataset = JSON.parse(await fs.readFile('data/v2_mscoco_val2014_annotations.json', 'utf-8'))

  const exercises: any[] = []

  const allPossibleAnswers = uniq(annotationsDataset.annotations.flatMap(ann => ann.answers.map(a => a.answer)))

  for (let i = 0; i < 1000; i++) {
    const question = questionsDataset.questions[i]
    const annotation = annotationsDataset.annotations[i]

    let choices: string[] = []
    if (annotation.question_type === 'yes/no') {
      choices = ['yes', 'no']
    } else {
      const incorrectAnswers = sampleSize(allPossibleAnswers, 3)
      choices = shuffle([annotation.multiple_choice_answer, ...incorrectAnswers])
    }

    const exercise = {
      questionId: question.question_id,
      imageId: question.image_id,
      question: question.question,
      answer: annotation.multiple_choice_answer,
      choices: choices,
    }

    exercises.push(exercise)
  }

  await fs.writeFile('data/vqa-exercises-en.json', JSON.stringify(exercises, null, 2))
}

main()