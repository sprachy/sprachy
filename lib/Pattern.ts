import * as z from 'zod'
import { dialogueSchema } from './Dialogue'
import { parseExercise, type Exercise } from './Exercise'

const patternSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  shortdesc: z.string(),
  dialogue: dialogueSchema,
  exercises: z.any().transform(d => d.map(parseExercise)),
  body: z.any()
})

export type Pattern = Omit<z.infer<typeof patternSchema>, 'exercises'> & { exercises: Exercise[] }

export function parsePattern(def: any): Pattern {
  def = {
    ...def,
    slug: def._path.slice(1)
  }

  if (def.dialogue && !def.dialogue.title) {
    def.dialogue.title = def.title
  }

  const result = patternSchema.safeParse({ slug: def._path?.slice(1), ...def })


  if (result.success) {
    return result.data as Pattern
  } else {
    console.warn(`Invalid pattern data ${def.id}`, def, result.error)
    return def as any as Pattern
  }
}

export const patternNavigationItemSchema = patternSchema.pick({
  id: true,
  title: true,
  slug: true,
  shortdesc: true
})

export type PatternNavigationItem = z.infer<typeof patternNavigationItemSchema>

export function parsePatternNavigationItem(def: any) {
  def = {
    ...def,
    slug: def._path.slice(1)
  }

  const result = patternNavigationItemSchema.safeParse(def)

  if (result.success) {
    return result.data
  } else {
    console.warn(`Invalid pattern navigation item ${def.id}`, def, result.error.format())
    return def as any as PatternNavigationItem
  }
}

// import { parseExercise, type Exercise, type ExerciseDef } from "./Exercise"

// export type CharacterId = string
// export type PatternId = string

// /**
//  * A pattern definition. Defines what is actually written into the
//  * individual pattern files. Structured to make it easy to write
//  * definitions.
//  */
// export type PatternDef = {
//   id: string
//   title: string
//   slug: string
//   shortdesc: string
//   explanation: string
//   storyTitle?: string
//   story: LineDef[]
//   exercises: ExerciseDef[]
//   feedback?: FeedbackDef[]

//   /**
//    * If set, the pattern will only be visible to admins.
//    */
//   draft?: true

//   /**
//    * If set, the pattern will not be shown in the list of patterns
//    * or accessible as an individual page.
//    * It will still appear to users in the learning sequence.
//    */
//   hidden?: true
// }

// export type FeedbackDef = {
//   answer: string
//   attempt: string
//   message: string
// }

// export type SpecialLineId = 'morph' | 'alien'

// export type ReadingLineDef = {
//   from: CharacterId
//   message?: string
//   translation?: string
//   image?: string
//   imageAlt?: string
//   special?: SpecialLineId
// }

// export type MultipleChoiceLineDef = {
//   question: string
//   choices: { text: string, correct?: boolean }[]
// }

// export type LineDef = ReadingLineDef | MultipleChoiceLineDef

// export type ReadingLine = {
//   type: 'reading'
//   from: CharacterId
//   message?: string
//   translation?: string
//   explanation?: string
//   image?: string
//   imageAlt?: string
//   special?: SpecialLineId
// }

// export type MultipleChoiceLine = {
//   type: 'choice'
//   question: string
//   choices: { text: string, correct?: boolean }[]
// }

// export type StoryLine = ReadingLine | MultipleChoiceLine

// /**
//  * A pattern after parsing the definition file. Structured
//  * to be friendly for code use.
//  */
// export type Pattern = Omit<PatternDef, "story" | "exercises"> & {
//   story: StoryLine[]
//   exercises: Exercise[]
//   maxLevel: number
// }

// export type Story = Pattern['story']

// /** Turn a PatternDef into a Pattern for use by code. */
// export function parsePattern(patternDef: PatternDef): Pattern {
//   const exercises: Exercise[] = []
//   for (const exerciseDef of patternDef.exercises) {
//     const ex = parseExercise(patternDef, exerciseDef)
//     if (ex) {
//       exercises.push(ex)
//     }
//   }

//   return Object.assign({}, patternDef, {
//     story: patternDef.story.map(lineDef => parseLine(lineDef)),
//     storyTitle: patternDef.storyTitle || patternDef.title,
//     maxLevel: 9,
//     exercises: exercises
//   })
// }


// export function parseLine(lineDef: LineDef): StoryLine {
//   if ('choices' in lineDef) {
//     return {
//       type: 'choice',
//       ...lineDef
//     }
//   } else {
//     return {
//       type: 'reading',
//       ...lineDef
//     }
//   }
// }
