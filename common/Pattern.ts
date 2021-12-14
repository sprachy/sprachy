import { Exercise, ExerciseDef, parseExercise } from "./Exercise"
import type { IconDefinition } from "@fortawesome/fontawesome-common-types"
import _ from "lodash"

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

export type Pattern = Omit<PatternDef, "exercises"> & {
  levels: { exercises: Exercise[] }[]
}

export function parsePattern(patternDef: PatternDef): Pattern {
  return Object.assign({}, patternDef, {
    levels: patternDef.exercises.map((exs) => ({
      exercises: exs.map((ex) => parseExercise(ex)),
    })),
  })
}
