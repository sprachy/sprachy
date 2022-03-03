import type { IconDefinition } from "@fortawesome/fontawesome-common-types"
import _ from "lodash"

/**
 * A pattern definition. Defines what is actually written into the
 * individual pattern files. Structured to make it easy to write
 * definitions.
 */
export type PatternDef = {
  draft?: true
  id: string
  title: string
  slug: string
  shortdesc: string
  icon: IconDefinition
  explanation: string
  story: LineDef[]
  exercises: LineDef[]
}

export type LineDef = {
  from: string
  message: string
  translation: string
  explanation?: string
  hint?: string
  feedback?: { [key: string]: string }
}

export type ReadingLine = {
  type: 'reading'
  from: string
  message: string
  translation: string
  explanation?: string
}

export type FillblankLine = {
  type: 'fillblank'
  from: string
  message: string
  translation: string
  canonicalAnswer: string
  validAnswers: string[]
  explanation?: string
  hint?: string
  feedback?: { [key: string]: string }
}

export type StoryLine = ReadingLine | FillblankLine


export type Exercise = FillblankLine

/**
 * A pattern after parsing the definition file. Structured
 * to be friendly for code use.
 */
export type Pattern = Omit<PatternDef, "story"> & {
  story: StoryLine[]
  exercises: Exercise[]
  maxLevel: number
}

export type Story = Pattern['story']

/** Turn a PatternDef into a Pattern for use by code. */
export function parsePattern(patternDef: PatternDef): Pattern {
  return Object.assign({}, patternDef, {
    story: patternDef.story.map(parseLine),
    maxLevel: 5,
    exercises: patternDef.exercises ? patternDef.exercises.map(parseLine) as Exercise[] : []
  })
}

export function parseLine(lineDef: LineDef): StoryLine {
  const match = lineDef.message.match(/\[(.+?)\]/)
  if (match) {
    const canonicalAnswer = match[1]!

    return {
      type: 'fillblank',
      canonicalAnswer: canonicalAnswer,
      validAnswers: [canonicalAnswer],
      ...lineDef
    }
  } else {
    return {
      type: 'reading',
      ...lineDef
    }
  }
}
