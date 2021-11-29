import patterns from '../patterns'
import type { ExerciseDef, PatternDef } from './definePattern'

export type Exercise = {
  canonicalAnswer: string
} & ExerciseDef

export type Pattern = PatternDef & {
  exercises: Exercise[]
}

function parseExercise(exerciseDef: ExerciseDef): Exercise {
  let canonicalAnswer = ""
  let translatedAnswer = ""
  exerciseDef.content.replace(/\[(.+?)\]/g, (m, part) => {
    if (!canonicalAnswer) {
      canonicalAnswer = part
      return "____"
    } else {
      translatedAnswer = part
      return `**${part}**`
    }
  })

  return Object.assign({
    canonicalAnswer,
  }, exerciseDef)
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