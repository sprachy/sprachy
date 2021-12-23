import _ from "lodash"
import type { ProgressItem, User, ProgressSummary } from "../common/api"
import type { FillblankLine, Line, Pattern, Story } from "../common/Pattern"
import { sprachdex } from "../common/sprachdex"
import time from "../common/time"
import type { SprachyAPIClient } from "./SprachyAPIClient"

/**
 * Application-wide state for when the user is signed in
 */
export class UserApp {
  user!: User
  progressItems!: ProgressItem[]

  constructor(readonly api: SprachyAPIClient, summary: ProgressSummary) {
    this.receiveProgress(summary)
  }

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

  get patternsAndProgress(): MaybeLearnedPattern[] {
    return sprachdex.allPatterns.map((p) => {
      const progressItem = this.progressItemByPatternId[p.id]
      return Object.assign({}, p, {
        progress: progressItem ? new PatternProgress(p, progressItem) : null,
      })
    })
  }

  get nextPatternToLearn(): NotLearnedPattern | undefined {
    return this.patternsAndProgress.find((p) => !p.progress) as NotLearnedPattern | undefined
  }

  /** All patterns for which the user has completed at least level 1 */
  get learnedPatterns(): LearnedPattern[] {
    return this.patternsAndProgress.filter(p => !!p.progress) as LearnedPattern[]
  }

  /**
   * All learned patterns which are ready for levelup.
   * Ordered by previous review time, so the patterns you haven't
   * reviewed for the longest come first.
   */
  get patternsReadyToLevel() {
    const patterns = this.learnedPatterns.filter(p => !!p.progress && p.progress.levelableAt && p.progress.levelableAt <= Date.now())
    return _.sortBy(patterns, p => p.progress!.levelableAt)
  }

  /** Get all stories the user already completed, across all patterns */
  get allCompletedStories() {
    const stories: Story[] = []
    for (const pattern of this.learnedPatterns) {
      for (let i = 0; i < pattern.progress.item.srsLevel; i++) {
        const story = pattern.stories[i]
        if (story) {
          stories.push(story)
        }
      }
    }
    return stories
  }

  /** All fillblank exercises the user has completed, across all patterns */
  get allCompletedFillblanks() {
    const lines: FillblankLine[] = []
    for (const story of this.allCompletedStories) {
      for (const line of story.lines) {
        if (line.type === 'fillblank') {
          lines.push(line)
        }
      }
    }
    return lines
  }
}

class PatternProgress {
  constructor(readonly pattern: Pattern, readonly item: ProgressItem) { }

  get mastered() {
    return this.item.srsLevel >= this.pattern.maxLevel
  }

  get levelableAt(): number | null {
    if (this.mastered) {
      return null
    } else {
      return this.item.lastLeveledAt + time.toNextSRSLevel(this.item.srsLevel)
    }
  }
}

export type NotLearnedPattern = Pattern & { progress: null }

export type LearnedPattern = Pattern & { progress: PatternProgress }

export type MaybeLearnedPattern = LearnedPattern | NotLearnedPattern
