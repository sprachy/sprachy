import type { IconDefinition } from "@fortawesome/fontawesome-common-types"
import _ from "lodash"

export type CharacterId = string
export type PatternId = string

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
  icon?: IconDefinition
  explanation: string
  story: LineDef[]
  exercises: LineDef[]
  feedback?: FeedbackDef[]

  /**
   * If set, the pattern will only be visible to admins.
   */
  draft?: true

  /**
   * If set, the pattern will not be shown in the list of patterns
   * or accessible as an individual page.
   * It will still appear to users in the learning sequence.
   */
  hidden?: true
}

export type FeedbackDef = {
  answer: string
  attempt: string
  message: string
}

export type SpecialLineId = 'morph' | 'alien'

export type ReadingLineDef = {
  from: CharacterId
  message?: string
  translation?: string
  image?: string
  imageAlt?: string
  special?: SpecialLineId
}

export type FillblankLineDef = {
  from: CharacterId
  message: string
  translation: string
  explanation?: string
  hint?: string
  feedback?: { [attempt: string]: string }
}

export type MultipleChoiceLineDef = {
  question: string
  choices: { text: string, correct?: boolean }[]
}

export type LineDef = ReadingLineDef | FillblankLineDef | MultipleChoiceLineDef

export type ReadingLine = {
  type: 'reading'
  from: CharacterId
  message?: string
  translation?: string
  explanation?: string
  image?: string
  imageAlt?: string
  special?: SpecialLineId
}

export type FillblankLine = {
  type: 'fillblank'
  from: CharacterId
  message: string
  translation: string
  canonicalAnswer: string
  validAnswers: string[]
  explanation?: string
  hint?: string
  feedback?: FeedbackDef[]
}

export type MultipleChoiceLine = {
  type: 'choice'
  question: string
  choices: { text: string, correct?: boolean }[]
}

export type StoryLine = ReadingLine | MultipleChoiceLine


export type Exercise = FillblankLine

/**
 * A pattern after parsing the definition file. Structured
 * to be friendly for code use.
 */
export type Pattern = Omit<PatternDef, "story" | "exercises"> & {
  story: StoryLine[]
  exercises: Exercise[]
  maxLevel: number
}

export type Story = Pattern['story']

/** Turn a PatternDef into a Pattern for use by code. */
export function parsePattern(patternDef: PatternDef): Pattern {
  const exercises: Exercise[] = []
  for (const exerciseDef of patternDef.exercises) {
    const line = parseLine(patternDef, exerciseDef)
    if (line.type !== 'fillblank') {
      console.error(`Discarding invalid exercise definition. Did we forget to define a fillblank? ${JSON.stringify(exerciseDef)}`)
    } else {
      exercises.push(line)
    }
  }

  return Object.assign({}, patternDef, {
    story: patternDef.story.map(ex => parseLine(patternDef, ex) as StoryLine),
    maxLevel: 9,
    exercises: exercises
  })
}

export function parseLine(patternDef: PatternDef, lineDef: LineDef): StoryLine | FillblankLine {
  const match = 'message' in lineDef && lineDef.message?.match(/\[(.+?)\]/)
  if (match) {
    const fillblankDef = lineDef as FillblankLineDef
    const canonicalAnswer = match[1]!

    const lineSpecificFeedback: FeedbackDef[] = []
    if (fillblankDef.feedback) {
      for (const attempt in fillblankDef.feedback) {
        lineSpecificFeedback.push({
          answer: canonicalAnswer,
          attempt: attempt,
          message: fillblankDef.feedback[attempt]!
        })
      }
    }

    return {
      type: 'fillblank',
      canonicalAnswer: canonicalAnswer,
      validAnswers: [canonicalAnswer],
      ...fillblankDef,
      feedback: lineSpecificFeedback.concat(patternDef.feedback || []),
    }
  } else if ('choices' in lineDef) {
    return {
      type: 'choice',
      ...lineDef
    }
  } else {
    return {
      type: 'reading',
      ...lineDef
    }
  }
}
