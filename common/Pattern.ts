import { Exercise, ExerciseDef, parseExercise } from "./Exercise"
import type { IconDefinition } from "@fortawesome/fontawesome-common-types"
import _ from "lodash"

/**
 * A pattern definition. Defines what is actually written into the
 * individual pattern files. Structured to make it easy to write
 * definitions.
 */
export type PatternDef = {
  id: string
  title: string
  slug: string
  shortdesc: string
  icon: IconDefinition
  explanation: string
  /** Exercises by level */
  exercises: ExerciseDef[][]
}

/**
 * A pattern after parsing the definition file. Structured
 * to be friendly for code use.
 */
export type Pattern = Omit<PatternDef, "exercises"> & {
  levels: { exercises: Exercise[] }[]
}

/** Turn a PatternDef into a Pattern for use by code. */
export function parsePattern(patternDef: PatternDef): Pattern {
  return Object.assign({}, patternDef, {
    levels: patternDef.exercises.map((exs) => ({
      exercises: exs.map((ex) => parseExercise(ex)),
    })),
  })
}
