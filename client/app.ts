import _ from 'lodash'
import type { ProgressItem, User, ProgressSummary, Pattern } from '../common/api'
import { sprachdex } from '../common/sprachdex'
import time from '../common/time'
import type { UserAPI } from './ClientAPI'

class PatternProgress {
  constructor(readonly pattern: Pattern, readonly item: ProgressItem) { }

  get mastered() {
    return this.item.srsLevel >= 9
  }

  get levelableAt() {
    return this.item.lastLeveledAt + time.toNextSRSLevel(this.item.srsLevel)
  }
}

/**
 * Global store for cross-component data and caches
 */
export class SprachyApp {
  static instance: SprachyApp
  user!: User
  progressItems!: ProgressItem[]

  constructor(readonly api: UserAPI, summary: ProgressSummary) {
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

  get progressItemByPatternId(): { [patternId: string]: ProgressItem | undefined } {
    return _.keyBy(this.progressItems, (p) => p.patternId)
  }

  get patternsWithProgress() {
    return sprachdex.allPatterns.map((p) => {
      const progressItem = this.progressItemByPatternId[p.id]
      return Object.assign({}, p, {
        progress: progressItem ? new PatternProgress(p, progressItem) : null
      })
    })
  }

  get nextPatternToLearn() {
    return this.patternsWithProgress.find(p => !p.progress)
  }
}