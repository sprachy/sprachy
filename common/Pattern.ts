import { Exercise } from "./Exercise"
import type { ExerciseDef } from "./Exercise"
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

export interface Pattern extends Omit<PatternDef, "exercises"> {}

export class Pattern {
  levels: { exercises: Exercise[] }[]
  constructor(readonly def: PatternDef) {
    Object.assign(this, _.omit(def, "exercises"))
    this.levels = def.exercises.map((exs) => ({
      exercises: exs.map((ex) => new Exercise(ex)),
    }))
  }
}
