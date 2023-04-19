import { keyBy } from 'lodash'
import type { Pattern } from "~/lib/Pattern"
import type { Exercise } from '~/lib/Exercise'
import { sprachdex } from "~/lib/sprachdex"
import { CanvasEffects } from "~/lib/CanvasEffects"
import { time } from '~/lib/time'

export type Review = Exercise & {
  pattern: PatternAndProgress
}

export type LearningReviews = {
  type: 'review'
  patterns: Pattern[]
  why: string
}

export type LearningDialogue = {
  type: 'dialogue'
  pattern: Pattern
  why: string
}

export type LearningPattern = {
  type: 'pattern'
  pattern: Pattern
  why: string
  readExplanation: boolean
}

export type Learning = LearningReviews | LearningDialogue | LearningPattern

// export type CurrentLearning = {
//   type: 'review'
//   patterns: Pattern[]
// }


/**
 * Single page application state for when the user is signed in
 */
export class SprachyUserSPA {
  user: UserWithProgress
  learning?: Learning

  /** 
   * For drawing success confetti animation
   */
  effects = new CanvasEffects()

  constructor(user: UserWithProgress) {
    this.user = user
  }

  get admin() {
    return this.user.isAdmin
  }
}

export class PatternProgress {
  constructor(readonly pattern: Pattern, readonly item?: ProgressItem) { }

  get experience() {
    return this.item?.experience || 0
  }

  get level() {
    return Math.floor(this.experience / 1000)
  }
}

export type PatternAndProgress = Pattern & { progress: PatternProgress }