import patterns from '../patterns'
import type { ExerciseDef, PatternDef } from './definePattern'

export type Exercise = {
  canonicalAnswer: string
  validAnswers: string[]
} & ExerciseDef

export type Pattern = PatternDef & {
  exercises: Exercise[]
}

function parseExercise(exerciseDef: ExerciseDef): Exercise {
  const canonicalAnswer = exerciseDef.message?.match(/\[(.+?)\]/)![1]!

  return Object.assign({}, exerciseDef, {
    canonicalAnswer,
    validAnswers: [canonicalAnswer],
  })
}

function parsePattern(patternDef: PatternDef): Pattern {
  return Object.assign({}, patternDef, {
    exercises: patternDef.exercises.map(parseExercise)
  })
}

class Sprachdex {
  allPatterns = patterns.map(p => parsePattern(p))
}

export const sprachdex = new Sprachdex()