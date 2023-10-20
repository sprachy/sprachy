import { keyBy } from "lodash-es"
import type { Pattern, PatternNavigationItem } from "~/lib/Pattern"
import { PatternProgress } from "~/lib/PatternProgress"
import { combineProgress } from "~/lib/progress"
import { time } from "~/lib/time"

export type LearnableDialogue = {
  type: 'dialogue'
  pattern: PatternNavigationItem
  why: string
  data?: Pattern
}

export type LearnablePattern = {
  type: 'pattern'
  pattern: ProgressablePattern
  why: string
  readExplanation: boolean
  data?: Pattern
}

export type LearnableReviews = {
  type: 'review'
  patterns: PatternNavigationItem[]
  why: string
  data?: Pattern[]
}

export type Learnable = LearnableReviews | LearnableDialogue | LearnablePattern

export type ProgressablePattern = PatternNavigationItem & { progress: PatternProgress }

export class ProgressStore {
  patterns: PatternNavigationItem[] = []
  progressItems: ProgressItem[] = []
  currentLearnable: Learnable | null = null

  constructor() {
    $debug.$progressStore = this
  }

  get user() {
    return authStatus.user
  }

  get localProgressKey() {
    return `localProgressItems:${this.user?.id || 'guest'}`
  }

  get progressItemByPatternId() {
    return keyBy(this.progressItems, p => p.patternId)
  }

  get allViewablePatterns() {
    return this.patterns
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
    let pattern = this.progressablePatterns.find(p => p.progress.level === 1)
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

  async syncProgressWithServer() {
    const { progressItems } = await $fetch('/api/syncProgress', {
      method: 'POST',
      body: {
        progressItems: this.progressItems
      }
    })
    this.progressItems = combineProgress(this.progressItems, progressItems)
  }

  saveLocalProgress() {
    const localProgressItems = clientStorage.getJSON(this.localProgressKey) as ProgressItem[] || []
    const newLocalProgressItems = combineProgress(localProgressItems, this.progressItems)
    clientStorage.setJSON(this.localProgressKey, newLocalProgressItems)
  }

  loadLocalProgress() {
    const localProgressItems = clientStorage.getJSON(this.localProgressKey) as ProgressItem[] || []
    this.progressItems = combineProgress(this.progressItems, localProgressItems)
  }

  clearLocalProgress() {
    clientStorage.setJSON(this.localProgressKey, [])
    this.progressItems = []
  }

  /** 
   * Sets currentLearnable based on the user's current progress.
   * Learn page calls this when progress had been made and it's 
   * ready to move on. 
   **/
  updateCurrentLearnable() {
    this.currentLearnable = this.nextThingToLearn
  }

  /**
   * Gain an amount of experience in a given pattern
   * Updates local state immediately; persisted to backend only if user is logged in
   */
  async gainPatternExperience(patternId: string, amount: number) {
    let item = this.progressItemByPatternId[patternId]
    if (item) {
      item.experience += amount
      item.lastExperienceGainAt = Date.now()
    } else {
      item = {
        patternId,
        initiallyLearnedAt: Date.now(),
        lastExperienceGainAt: Date.now(),
        experience: amount
      }
      this.progressItems.push(item)
    }

    this.saveLocalProgress()
    if (this.user) {
      await this.syncProgressWithServer()
    }
  }

  /** Skip the current learnable, gaining experience as though 
   * the user had completed it */
  async skipCurrentLearnable() {
    const { currentLearnable } = this
    if (!currentLearnable) return

    if (currentLearnable.type === 'dialogue') {
      await this.gainPatternExperience(currentLearnable.pattern.id, 1000)
    } else if (currentLearnable.type === 'pattern') {
      await this.gainPatternExperience(currentLearnable.pattern.id, 1000)
    } else if (currentLearnable.type === 'review') {
      for (const pattern of currentLearnable.patterns) {
        await this.gainPatternExperience(pattern.id, 1000)
      }
    }

    this.updateCurrentLearnable()
  }

  async devTimeSkip() {
    // this.receiveProgress(await this.api.devTimeSkip())
    if (!this.user) {
      for (const item of this.progressItems) {
        item.lastExperienceGainAt = item.lastExperienceGainAt - time.days(100)
      }
    } else {

    }
    this.updateCurrentLearnable()
  }

  async reallyResetAllUserProgress() {
    clientStorage.setJSON(this.localProgressKey, [])
    this.progressItems = []
    // const summary = await this.api.resetProgress()
    // this.receiveProgress(summary)

    this.updateCurrentLearnable()
  }
}

export const progressStore = defineState(new ProgressStore())