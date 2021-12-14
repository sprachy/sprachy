export type ExerciseDef = {
  from: string
  message: string
  translation: string
  hint?: string
  feedback?: { [key: string]: string }
}

export interface Exercise extends ExerciseDef {}

export class Exercise {
  canonicalAnswer: string
  validAnswers: string[]

  constructor(readonly exerciseDef: ExerciseDef) {
    Object.assign(this, exerciseDef)
    this.canonicalAnswer = exerciseDef.message?.match(/\[(.+?)\]/)![1]!
    this.validAnswers = [this.canonicalAnswer]
  }
}
