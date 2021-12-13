import patterns from "../patterns"
import type { ExerciseDef, PatternDef } from "./definePattern"
import characters, { Character } from "../common/characters"

/**
 * Main interface for accessing sprachy content (patterns and exercises).
 *
 * Everything is currently compiled into the code bundle, so it's all
 * synchronously available.
 */
class Sprachdex {
  allPatterns = patterns.map((p) => parsePattern(p))

  getCharacter(characterId: string): Character {
    return characters.find((c) => c.id === characterId)
  }
}

function parsePattern(patternDef: PatternDef): Pattern {
  return Object.assign({}, patternDef, {
    exercises: patternDef.exercises.map(parseExercise),
  })
}

function parseExercise(exerciseDef: ExerciseDef): Exercise {
  const canonicalAnswer = exerciseDef.message?.match(/\[(.+?)\]/)![1]!

  return Object.assign({}, exerciseDef, {
    canonicalAnswer,
    validAnswers: [canonicalAnswer], // TODO
  })
}

export type Exercise = {
  canonicalAnswer: string
  validAnswers: string[]
} & ExerciseDef

export type Pattern = PatternDef & {
  exercises: Exercise[]
}

export const sprachdex = new Sprachdex()
