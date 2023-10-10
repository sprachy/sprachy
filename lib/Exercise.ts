import type { CharacterId, FeedbackDef, PatternDef } from "./Pattern"

type ImageUrl = string

export type FillblankExerciseDef = {
  from: CharacterId
  message: string
  translation: string
  explanation?: string
  hint?: string
  feedback?: { [attempt: string]: string }
}

export type MultipleChoiceExerciseDef = {
  type: 'choice'
  from?: CharacterId
  message?: string
  translation?: string
  image?: ImageUrl
  hint?: string
  question: string
  questionTranslation?: string
  choices: { text: string; correct?: boolean }[]
}

export type ExerciseDef = FillblankExerciseDef | MultipleChoiceExerciseDef

export type FillblankExercise = Omit<FillblankExerciseDef, 'feedback'> & {
  type: 'fillblank'
  translation: string
  canonicalAnswer: string
  validAnswers: string[]
  feedback?: FeedbackDef[]
}

export type MultipleChoiceExercise = MultipleChoiceExerciseDef

export type Exercise = FillblankExercise | MultipleChoiceExercise

export function parseExercise(patternDef: PatternDef, exerciseDef: ExerciseDef): Exercise | null {
  if ('type' in exerciseDef && exerciseDef.type === 'choice') {
    return exerciseDef
  } else {
    const match = 'message' in exerciseDef && exerciseDef.message?.match(/\[(.+?)\]/)
    if (!match) {
      console.error(`Discarding invalid exercise definition. Did we forget to define a fillblank? ${JSON.stringify(exerciseDef)}`)
      return null
    }

    const fillblankDef = exerciseDef as FillblankExerciseDef
    const canonicalAnswer = match[1]!

    const lineSpecificFeedback: FeedbackDef[] = []
    if (fillblankDef.feedback) {
      for (const attempt in fillblankDef.feedback) {
        lineSpecificFeedback.push({
          answer: canonicalAnswer,
          attempt: attempt,
          message: fillblankDef.feedback[attempt]!
        })
      }
    }

    return {
      type: 'fillblank',
      canonicalAnswer: canonicalAnswer,
      validAnswers: [canonicalAnswer],
      ...fillblankDef,
      feedback: lineSpecificFeedback.concat(patternDef.feedback || []),
    }
  }
}