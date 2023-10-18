export type FillblankExerciseDef = {
  type: 'fillblank'
  from: string
  message: string
  translation: string
  hint?: string
  feedback?: { [attempt: string]: string }
  explanation?: string
  image?: string
}

export interface FillblankExercise extends FillblankExerciseDef { }

export class FillblankExercise {
  canonicalAnswer: string
  validAnswers: string[]

  constructor(def: FillblankExerciseDef) {
    Object.assign(this, def)

    const match = def.message?.match(/\[(.+?)\]/)
    if (!match) {
      console.error(`Discarding invalid exercise definition. Did we forget to define a fillblank?`, def)
    }

    this.canonicalAnswer = match ? match[1] : ''
    this.validAnswers = [this.canonicalAnswer]
  }
}

export type MultipleChoiceExerciseDef = {
  type: 'choice'
  from: string
  message: string
  translation: string
  image?: string
  hint?: string
  choices: { text: string; correct?: boolean }[]
}

export interface MultipleChoiceExercise extends MultipleChoiceExerciseDef { }

export class MultipleChoiceExercise {
  constructor(def: MultipleChoiceExerciseDef) {
    Object.assign(this, def)
  }
}

export type ExerciseDef = FillblankExerciseDef | MultipleChoiceExerciseDef

export type Exercise = FillblankExercise | MultipleChoiceExercise

export function parseExercise(def: ExerciseDef) {
  if (def.type === 'fillblank') {
    return new FillblankExercise(def)
  } else if (def.type === 'choice') {
    return new MultipleChoiceExercise(def)
  } else {
    throw new Error(`Unknown excercise type '${(def as any).type}'`)
  }
}