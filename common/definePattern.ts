import type { IconDefinition } from "@fortawesome/fontawesome-common-types"
import { md } from '../common/sprachdown'

export type PatternDef = {
  id: string
  title: string
  slug: string
  shortdesc: string
  icon: IconDefinition
  explanation: string
  exercises: {
    from: string
    message: string
    translation: string
    hint?: string
    feedback?: { [key: string]: string }
  }[]
}

export type ExerciseDef = PatternDef['exercises'][0]

export function definePattern(def: PatternDef): PatternDef {
  return def
}

export { md }
