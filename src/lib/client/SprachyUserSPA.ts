

import _ from 'lodash'
import type { SprachyAPIClient } from "./SprachyAPIClient"
import type { ProgressItem, User, ProgressSummary } from "$lib/api"
import type { Exercise, FillblankLine, Pattern, Story } from "$lib/Pattern"
import { sprachdex } from "$lib/sprachdex"
import { time } from "$lib/time"
import { CanvasEffects } from "$lib/client/CanvasEffects"
import { SpeechSystem } from '$lib/SpeechSystem'

export type Review = Exercise & {
  pattern: PatternAndProgress
}

/**
 * Single page application state for when the user is signed in
 */
export class SprachyUserSPA {
  user: User
  progressItems: ProgressItem[]

  speech = new SpeechSystem()

  /** 
   * For drawing success confetti animation
   */
  effects = new CanvasEffects()


  constructor(readonly api: SprachyAPIClient, summary: ProgressSummary) {
    this.user = summary.user
    this.progressItems = summary.progressItems
  }

  get admin() {
    return this.user && this.user.isAdmin
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

    this.progressItems.push(item)
  }

  get progressItemByPatternId(): {
    [patternId: string]: ProgressItem | undefined
  } {
    return _.keyBy(this.progressItems, (p) => p.patternId)
  }

  getProgressFor(pattern: Pattern) {
    const progressItem = this.progressItemByPatternId[pattern.id]
    return new PatternProgress(pattern, progressItem)
  }

  get allViewablePatterns(): Pattern[] {
    return this.user.isAdmin ? sprachdex.patternsIncludingDrafts : sprachdex.publishedPatterns
  }

  get patternsAndProgress(): PatternAndProgress[] {
    return this.allViewablePatterns.map((p) => {
      return Object.assign({}, p, {
        progress: this.getProgressFor(p)
      })
    })
  }

  get nextPatternToLearn(): PatternAndProgress | undefined {
    return this.patternsAndProgress.find((p) => p.progress.srsLevel === 0) as PatternAndProgress | undefined
  }

  /** All patterns for which the user has completed at least level 1 */
  get learnedPatterns(): PatternAndProgress[] {
    return this.patternsAndProgress.filter(p => p.progress.srsLevel > 0) as PatternAndProgress[]
  }

  /**
   * All learned patterns which are ready for levelup.
   * Ordered by previous review time, so the patterns you haven't
   * reviewed for the longest come first.
   */
  get patternsReadyToLevel() {
    const patterns = this.learnedPatterns.filter(p => p.progress.levelableAt && p.progress.levelableAt <= Date.now())
    return _.sortBy(patterns, p => p.progress.levelableAt)
  }

  get nextLevelablePattern() {
    const patterns = _.sortBy(this.learnedPatterns, p => p.progress.levelableAt)
    return patterns[0]
  }

  /** Get all stories the user already completed, across all patterns */
  get allCompletedStories() {
    const stories: Story[] = []
    for (const pattern of this.learnedPatterns) {
      stories.push(pattern.story)
    }
    return stories
  }

  /** All fillblank exercises the user has completed, across all patterns */
  get allCompletedFillblanks() {
    const lines: FillblankLine[] = []
    for (const story of this.allCompletedStories) {
      for (const line of story) {
        if (line.type === 'fillblank') {
          lines.push(line)
        }
      }
    }
    return lines
  }

  /** Get reviews for all learned patterns, regardless of levelup availability */
  get allReviews() {
    let reviews: Review[] = []
    for (const pattern of this.learnedPatterns) {
      for (const exercise of pattern.exercises) {
        reviews.push(Object.assign({}, exercise, { pattern }))
      }
    }
    return reviews
  }

  /** Get reviews from patterns ready to level */
  get reviewsForLeveling() {
    let reviews: Review[] = []
    for (const pattern of this.patternsReadyToLevel) {
      for (const exercise of pattern.exercises) {
        reviews.push(Object.assign({}, exercise, { pattern }))
      }
    }
    return reviews
  }
}

class PatternProgress {
  constructor(readonly pattern: Pattern, readonly item?: ProgressItem) { }

  get srsLevel() {
    return this.item?.srsLevel || 0
  }

  get mastered() {
    return this.srsLevel >= this.pattern.maxLevel
  }

  get levelableAt(): number | null {
    if (this.mastered) {
      return null
    } else if (this.item) {
      return this.item.lastLeveledAt + time.toNextSRSLevel(this.item.srsLevel)
    } else {
      return Date.now()
    }
  }

  get readyToLevel(): boolean {
    return !!(this.levelableAt && this.levelableAt <= Date.now())
  }

  get completedLevels() {
    const levels: number[] = []
    for (let i = 0; i < this.srsLevel; i++) {
      levels.push(i)
    }
    return levels
  }
}

export type PatternAndProgress = Pattern & { progress: PatternProgress }