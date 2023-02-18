import { keyBy } from 'lodash'
import type { SprachyAPIClient } from "./SprachyAPIClient"
import type { ProgressItem, User, ProgressSummary } from "~/lib/types"
import type { Pattern } from "~/lib/Pattern"
import type { Exercise } from '~/lib/Exercise'
import { sprachdex } from "~/lib/sprachdex"
import { CanvasEffects } from "~/lib/CanvasEffects"
import { SpeechSystem } from '~/lib/SpeechSystem'
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
  user: User
  progressItems: ProgressItem[]
  learning?: Learning

  speech = new SpeechSystem(this)

  /** 
   * For drawing success confetti animation
   */
  effects = new CanvasEffects()

  constructor(readonly api: SprachyAPIClient, readonly backgroundApi: SprachyAPIClient, summary: ProgressSummary) {
    this.user = summary.user
    this.progressItems = summary.progressItems
  }

  get admin() {
    return this.user.isAdmin
  }

  async refreshProgress() {
    const summary = await this.api.getProgress()
    this.receiveProgress(summary)
  }

  receiveProgress(summary: ProgressSummary) {
    this.user = summary.user
    this.progressItems = summary.progressItems
  }

  // Update local progress with a single new item
  receiveProgressItem(item: ProgressItem) {
    for (let i = 0; i < this.progressItems.length; i++) {
      if (this.progressItems[i]!.patternId === item.patternId) {
        this.progressItems[i] = item
        return
      }
    }
  }

  /**
   * Gain an amount of experience in a given pattern
   * Updates local state immediately without waiting for backend confirmation
   */
  async gainPatternExperience(patternId: string, amount: number) {
    const item = this.progressItems.find(item => item.patternId === patternId)
    if (item) {
      item.experience += amount
      item.lastExperienceGainAt = Date.now()
    } else {
      this.progressItems.push({
        id: 'none',
        userId: this.user.id,
        patternId,
        initiallyLearnedAt: Date.now(),
        lastExperienceGainAt: Date.now(),
        lastLeveledAt: Date.now(),
        experience: amount
      })
    }

    return this.api.gainExperience({ [patternId]: amount })
  }

  async reallyResetAllUserProgress() {
    const summary = await this.api.resetProgress()
    this.receiveProgress(summary)
    this.recalcCurrentLearning()
  }

  get allViewablePatterns() {
    return this.admin ? sprachdex.patternsIncludingDrafts : sprachdex.publishedPatterns
  }

  get progressItemByPatternId() {
    return keyBy(this.progressItems, (p) => p.patternId)
  }

  get patternsAndProgress() {
    return this.allViewablePatterns.map(pattern => {
      return Object.assign({}, pattern, {
        progress: new PatternProgress(pattern, this.progressItemByPatternId[pattern.id])
      })
    }) as PatternAndProgress[]
  }

  get patternAndProgressById() {
    return keyBy(this.patternsAndProgress, (p) => p.id)
  }

  get progressByPatternId() {
    const progressByPatternId: { [patternId: string]: PatternProgress } = {}
    for (const pattern of this.patternsAndProgress) {
      progressByPatternId[pattern.id] = pattern.progress
    }
    return progressByPatternId
  }

  get nextPatternToLearn() {
    return this.patternsAndProgress.find((p) => p.progress.experience === 0)
  }

  get learnedPatterns() {
    return this.patternsAndProgress.filter(p => p.progress.experience > 0)
  }

  get totalExperience() {
    return this.progressItems.reduce((total, item) => total + item.experience, 0)
  }

  /**
   * Patterns we think the user should review, based on how long it has
   * been since they last looked at them.
   */
  get patternsToReview() {
    return this.patternsAndProgress.filter(p =>
      p.progress.item && p.progress.level > 0 && p.progress.level < 9 &&
      p.progress.item.lastExperienceGainAt < Date.now() - time.toNextSRSLevel(p.progress.level))
  }

  get nextThingToLearn() {
    // First review anything that's ready for review
    if (this.patternsToReview.length) {
      return {
        type: 'review',
        patterns: this.patternsToReview,
        why: `Reviewing ${this.patternsToReview.length} patterns`
      } as Learning
    }

    // Next, level any patterns that are only level 1 (completed dialogue but no exercises)
    let pattern = this.patternsAndProgress.find(p => p.progress.level === 1 && p.exercises.length)
    if (pattern) {
      return {
        type: 'pattern',
        pattern: pattern,
        why: `${pattern.title}`,
        readExplanation: false
      } as Learning
    }

    // Finally, learn a new pattern
    pattern = this.patternsAndProgress.find(p => p.progress.level < 1)
    if (pattern) {
      return {
        type: 'dialogue',
        pattern: pattern,
        why: `${pattern.title}`
      } as Learning
    }

    // Nothing left to learn!
    return undefined

  }

  async devTimeSkip() {
    this.receiveProgress(await this.api.devTimeSkip())
    this.recalcCurrentLearning()
  }

  async recalcCurrentLearning() {
    this.learning = this.nextThingToLearn
  }

  async skipCurrentLearning() {
    if (!this.learning) {
      return
    }

    if (this.learning.type === 'dialogue') {
      await this.gainPatternExperience(this.learning.pattern.id, 1000)
    } else if (this.learning.type === 'pattern') {
      await this.gainPatternExperience(this.learning.pattern.id, 1000)
    } else if (this.learning.type === 'review') {
      for (const pattern of this.learning.patterns) {
        await this.gainPatternExperience(pattern.id, 1000)
      }
    }

    this.recalcCurrentLearning()
  }

  /** Get reviews from patterns ready to level */
  // reviewsForLeveling = derived(this.patternsReadyToLevel, $patternsReadyToLevel => {
  //   let reviews: Review[] = []
  //   for (const pattern of $patternsReadyToLevel) {
  //     for (const exercise of pattern.exercises) {
  //       reviews.push(Object.assign({}, exercise, { pattern }))
  //     }
  //   }
  //   return reviews
  // })
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