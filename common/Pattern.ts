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
  stories: { lines: LineDef[] }[]
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

export type Line = ReadingLine | FillblankLine


/**
 * A pattern after parsing the definition file. Structured
 * to be friendly for code use.
 */
export type Pattern = Omit<PatternDef, "stories"> & {
  stories: { lines: Line[] }[]
  maxLevel: number
}

export type Story = Pattern['stories'][0]

/** Turn a PatternDef into a Pattern for use by code. */
export function parsePattern(patternDef: PatternDef): Pattern {
  return Object.assign({}, patternDef, {
    stories: patternDef.stories.map((story) => ({
      lines: story.lines.map(parseLine),
    })),
    maxLevel: patternDef.stories.length
  })
}

export function parseLine(lineDef: LineDef): Line {
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
