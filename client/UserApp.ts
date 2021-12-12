import _ from 'lodash'
import type { ProgressItem, User, ProgressSummary } from '../common/api'
import { sprachdex, Pattern } from '../common/sprachdex'
import time from '../common/time'
import type { UserAPI } from './SprachyAPIClient'

/**
 * Application-wide state for when the user is signed in
 */
 export class UserApp {
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

  get patternsWithProgress(): PatternWithProgress[] {
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

class PatternProgress {
  constructor(readonly pattern: Pattern, readonly item: ProgressItem) { }

  get mastered() {
    return this.item.srsLevel >= 9
  }

  get levelableAt() {
    return this.item.lastLeveledAt + time.toNextSRSLevel(this.item.srsLevel)
  }
}

export type PatternWithProgress = Pattern & { progress: PatternProgress|null }