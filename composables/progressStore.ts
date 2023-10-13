import type { ProgressItem } from "@prisma/client"
import { keyBy } from "lodash"
import type { Pattern } from "~/lib/Pattern"
import { PatternProgress } from "~/lib/PatternProgress"
import { sprachdex } from "~/lib/sprachdex"
import { time } from "~/lib/time"

type LocalProgressItem = Omit<ProgressItem, 'userId'> & {
  userId?: string
}

export type LearnableReviews = {
  type: 'review'
  patterns: Pattern[]
  why: string
}

export type LearnableDialogue = {
  type: 'dialogue'
  pattern: Pattern
  why: string
}

export type LearnablePattern = {
  type: 'pattern'
  pattern: Pattern
  why: string
  readExplanation: boolean
}

export type Learnable = LearnableReviews | LearnableDialogue | LearnablePattern

export type ProgressablePattern = Pattern & { progress: PatternProgress }

export class ProgressStore {
  user: User | null = null
  progressItems: LocalProgressItem[] = []
  currentLearnable: Learnable | null = null

  constructor() {
    (window as any).progressStore = this
  }

  get progressItemByPatternId() {
    return keyBy(this.progressItems, p => p.patternId)
  }

  get allViewablePatterns() {
    return sprachdex.patterns
  }

  get progressablePatterns() {
    return this.allViewablePatterns.map(pattern => {
      return Object.assign({}, pattern, {
        progress: new PatternProgress(this, pattern.id)
      })
    }) as ProgressablePattern[]
  }

  get progressablePatternById() {
    return keyBy(this.progressablePatterns, p => p.id)
  }

  /**
  * Patterns we think the user should review, based on how long it has
  * been since they last looked at them.
  */
  get patternsToReview() {
    return this.progressablePatterns.filter(p =>
      p.progress.item && p.progress.level > 0 && p.progress.level < 9 && p.progress.item.lastExperienceGainAt < Date.now() - time.toNextSRSLevel(p.progress.level))
  }

  get nextThingToLearn() {
    // First review anything that's ready for review
    if (this.patternsToReview.length) {
      return {
        type: 'review',
        patterns: this.patternsToReview,
        why: `Reviewing ${this.patternsToReview.length} patterns`
      } as Learnable
    }

    // Next, level any patterns that are only level 1 (completed dialogue but no exercises)
    let pattern = this.progressablePatterns.find(p => p.progress.level === 1 && p.exercises.length)
    if (pattern) {
      return {
        type: 'pattern',
        pattern: pattern,
        why: `${pattern.title}`,
        readExplanation: false
      } as Learnable
    }

    // Finally, learn a new pattern
    pattern = this.progressablePatterns.find(p => p.progress.level < 1)
    if (pattern) {
      return {
        type: 'dialogue',
        pattern: pattern,
        why: `${pattern.title}`
      } as Learnable
    }

    // Nothing left to learn!
    return null
  }

  updateCurrentLearnable() {
    this.currentLearnable = this.nextThingToLearn
  }

  /**
   * Gain an amount of experience in a given pattern
   * Updates local state immediately; persisted to backend only if user is logged in
   */
  async gainPatternExperience(patternId: string, amount: number) {
    console.log("gaining experience", patternId, amount)
    const item = this.progressItemByPatternId[patternId]
    if (item) {
      item.experience += amount
      item.lastExperienceGainAt = Date.now()
    } else {
      this.progressItems.push({
        userId: this.user?.id,
        patternId,
        initiallyLearnedAt: Date.now(),
        lastExperienceGainAt: Date.now(),
        experience: amount
      })
    }

    if (this.user)
      await api.reportProgress({
        experienceByPatternId: {
          [patternId]: amount
        }
      })
  }
}

export const progressStore = defineState(new ProgressStore())