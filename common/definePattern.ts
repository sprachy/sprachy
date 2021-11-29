import type { IconDefinition } from "@fortawesome/fontawesome-common-types"
import { md } from '../common/markdown'

export type PatternDef = {
  id: string
  title: string
  slug: string
  shortdesc: string
  icon: IconDefinition
  explanation: string
  exercises: {
    content: string
    feedback?: { [key: string]: string }
  }[]
}

export type ExerciseDef = PatternDef['exercises'][0]

export function definePattern(def: PatternDef): PatternDef {
  return def
}

export { md }
