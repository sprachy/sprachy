import * as z from 'zod'

// export type FillblankExerciseDef = {
//   from: CharacterId
//   message: string
//   translation: string
//   explanation?: string
//   hint?: string
//   feedback?: { [attempt: string]: string }
// }

// export type MultipleChoiceExerciseDef = {
//   type: 'choice'
//   from?: CharacterId
//   message?: string
//   translation?: string
//   image?: ImageUrl
//   hint?: string
//   question: string
//   questionTranslation?: string
//   choices: { text: string; correct?: boolean }[]
// }

// export type ExerciseDef = FillblankExerciseDef | MultipleChoiceExerciseDef

// export type FillblankExercise = Omit<FillblankExerciseDef, 'feedback'> & {
//   type: 'fillblank'
//   translation: string
//   canonicalAnswer: string
//   validAnswers: string[]
//   feedback?: FeedbackDef[]
// }

// export type MultipleChoiceExercise = MultipleChoiceExerciseDef

// export type Exercise = FillblankExercise | MultipleChoiceExercise

// export function parseExercise(patternDef: PatternDef, exerciseDef: ExerciseDef): Exercise | null {
//   if ('type' in exerciseDef && exerciseDef.type === 'choice') {
//     return exerciseDef
//   } else {
//     const match = 'message' in exerciseDef && exerciseDef.message?.match(/\[(.+?)\]/)
//     if (!match) {
//       console.error(`Discarding invalid exercise definition. Did we forget to define a fillblank? ${JSON.stringify(exerciseDef)}`)
//       return null
//     }

//     const fillblankDef = exerciseDef as FillblankExerciseDef
//     const canonicalAnswer = match[1]!

//     const lineSpecificFeedback: FeedbackDef[] = []
//     if (fillblankDef.feedback) {
//       for (const attempt in fillblankDef.feedback) {
//         lineSpecificFeedback.push({
//           answer: canonicalAnswer,
//           attempt: attempt,
//           message: fillblankDef.feedback[attempt]!
//         })
//       }
//     }

//     return {
//       type: 'fillblank',
//       canonicalAnswer: canonicalAnswer,
//       validAnswers: [canonicalAnswer],
//       ...fillblankDef,
//       feedback: lineSpecificFeedback.concat(patternDef.feedback || []),
//     }
//   }
// }

export const exerciseMultipleChoiceSchema = z.object({
  from: z.string(),
  type: z.literal('choice'),
  image: z.string().optional(),
  message: z.string(),
  translation: z.string(),
  hint: z.string().optional(),
  choices: z.array(z.object({
    text: z.string(),
    correct: z.boolean().optional().default(false),
  }))
})

export type ExerciseMultipleChoice = z.infer<typeof exerciseMultipleChoiceSchema>

const exerciseFillblankSchemaBase = z.object({
  from: z.string(),
  type: z.literal('fillblank'),
  image: z.string().optional(),
  message: z.string(),
  translation: z.string(),
  hint: z.string().optional(),
  feedback: z.record(z.string()).optional()
})

export const exerciseFillblankSchema = exerciseFillblankSchemaBase.transform(def => {
  const match = def.message?.match(/\[(.+?)\]/)
  if (!match) {
    console.error(`Discarding invalid exercise definition. Did we forget to define a fillblank?`, def)
    return def
  }

  const canonicalAnswer = match[1]!

  const lineSpecificFeedback: any[] = []
  if (def.feedback) {
    for (const attempt in def.feedback) {
      lineSpecificFeedback.push({
        answer: canonicalAnswer,
        attempt: attempt,
        message: def.feedback[attempt]!
      })
    }
  }

  return {
    ...def,
    canonicalAnswer: canonicalAnswer,
    validAnswers: [canonicalAnswer],
    feedback: lineSpecificFeedback
  }
})

export type ExerciseFillblank = z.infer<typeof exerciseFillblankSchema>

export const exerciseSchema = z.union([
  exerciseMultipleChoiceSchema,
  exerciseFillblankSchema
]).pipe(z.discriminatedUnion('type', [
  exerciseMultipleChoiceSchema,
  exerciseFillblankSchemaBase
]))

export type Exercise = z.infer<typeof exerciseSchema>

export function parseExercise(exerciseDef: unknown): Exercise {
  const result = exerciseSchema.safeParse(exerciseDef)
  if (result.success) {
    return result.data
  } else {
    console.warn(`Invalid exercise`, exerciseDef, result.error.format())
    return exerciseDef as any as Exercise
  }
}