import * as z from 'zod'
import { parseDialogue, type Dialogue, type DialogueDef } from './Dialogue'
import { parseExercise, type Exercise, type ExerciseDef } from './Exercise'

export type PatternDef = {
  _path: string
  id: string
  title: string
  shortdesc: string
  dialogue: DialogueDef
  exercises: ExerciseDef[]
  body: any
}

export type Pattern = Omit<PatternDef, 'exercises' | 'dialogue'> & { slug: string, exercises: Exercise[], dialogue: Dialogue }

export function parsePattern(obj: unknown): Pattern {
  const def = obj as PatternDef

  if (def.dialogue && !def.dialogue.title) {
    def.dialogue.title = def.title
  }

  return {
    ...def,
    slug: def._path.slice(1),
    exercises: def.exercises.map(parseExercise),
    dialogue: parseDialogue(def.dialogue)
  }
}

export type PatternNavigationItem = {
  id: string
  title: string
  slug: string
  shortdesc: string
}

export function parsePatternNavigationItem(def: any): PatternNavigationItem {
  return {
    ...def,
    slug: def._path.slice(1)
  }
}