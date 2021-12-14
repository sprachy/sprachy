export type ExerciseDef = {
  from: string
  message: string
  translation: string
  hint?: string
  feedback?: { [key: string]: string }
}

export type Exercise = ExerciseDef & {
  canonicalAnswer: string
  validAnswers: string[]
}

export function parseExercise(exerciseDef: ExerciseDef): Exercise {
  const canonicalAnswer = exerciseDef.message?.match(/\[(.+?)\]/)![1]!
  return Object.assign({}, exerciseDef, {
    canonicalAnswer: canonicalAnswer,
    validAnswers: [canonicalAnswer],
  })
}
