
import _ from "lodash"
// @ts-ignore
import NProgress from "accessible-nprogress?client"

import { browser } from "$app/env"

import { SprachyAPIClient } from "./SprachyAPIClient"
import type { ProgressItem, User, ProgressSummary } from "$lib/api"
import type { Exercise, FillblankLine, Pattern, Story } from "$lib/Pattern"
import { sprachdex } from "$lib/sprachdex"
import { time } from "$lib/time"

export type Review = Exercise & {
  pattern: PatternAndProgress
}

/**
 * Application-wide state for when the user is signed in
 */
export class SprachySPA {
  user?: User
  progressItems?: ProgressItem[]
  readonly api = new SprachyAPIClient()
  readonly backgroundApi = new SprachyAPIClient()

  async start() {
    if (!browser) {
      throw new Error("Tried to start SPA in a non-browser context")
    }

    // Configure nprogress to show the little loading bar at the top
    // whenever we're doing an API request
    NProgress.configure({ showSpinner: false })
    this.api.http.onRequest = (req) => {
      NProgress.promise(req)
    }

    await this.refreshProgress()
  }

  get admin() {
    return this.user && this.user.isAdmin
  }


  /** 
   * For drawing success confetti animation
   */
  // readonly effects = new CanvasEffects()


  async refreshProgress() {
    const summary = await this.api.getProgress()
    this.receiveProgress(summary)
  }

  receiveProgress(summary: ProgressSummary) {
    this.user = summary.user
    this.progressItems = summary.progressItems
    localStorage.setItem("summary", JSON.stringify(summary))
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

  get allViewablePatterns(): Pattern[] {
    return this.user.isAdmin ? sprachdex.patternsIncludingDrafts : sprachdex.publishedPatterns
  }

  get patternsAndProgress(): PatternAndProgress[] {
    return this.allViewablePatterns.map((p) => {
      const progressItem = this.progressItemByPatternId[p.id]
      return Object.assign({}, p, {
        progress: new PatternProgress(p, progressItem)
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

export const spa = browser ? new SprachySPA() : null
declare const window: { spa: SprachySPA }
if (browser) {
  window.spa = spa
}