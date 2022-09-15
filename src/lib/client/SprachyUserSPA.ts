

import _ from 'lodash'
import type { SprachyAPIClient } from "./SprachyAPIClient"
import type { ProgressItem, User, ProgressSummary } from "$lib/api"
import type { Exercise, Pattern } from "$lib/Pattern"
import { sprachdex } from "$lib/sprachdex"
import { CanvasEffects } from "$lib/client/CanvasEffects"
import { SpeechSystem } from '$lib/SpeechSystem'
import { derived, get, writable, type Readable, type Writable } from 'svelte/store'
import { time } from '$lib/time'

export type Review = Exercise & {
  pattern: PatternAndProgress
}

export type Learnable = {
  type: 'dialogue' | 'exercises'
  pattern: Pattern
  why: string
}

/**
 * Single page application state for when the user is signed in
 */
export class SprachyUserSPA {
  user: Writable<User> = writable({}) as any
  progressItems: Writable<ProgressItem[]> = writable([])

  speech = new SpeechSystem(this)

  /** 
   * For drawing success confetti animation
   */
  effects = new CanvasEffects()

  constructor(readonly api: SprachyAPIClient, readonly backgroundApi: SprachyAPIClient, summary: ProgressSummary) {
    this.receiveProgress(summary)
  }

  admin = derived(this.user, $user => $user.isAdmin)

  async refreshProgress() {
    const summary = await this.api.getProgress()
    this.receiveProgress(summary)
  }

  receiveProgress(summary: ProgressSummary) {
    this.user.set(summary.user)
    this.progressItems.set(summary.progressItems)
  }

  // Update local progress with a single new item
  receiveProgressItem(item: ProgressItem) {
    this.progressItems.update(items => {
      for (let i = 0; i < items.length; i++) {
        if (items[i]!.patternId === item.patternId) {
          items[i] = item
          return items
        }
      }

      items.push(item)
      return items
    })
  }

  /**
   * Gain an amount of experience in a given pattern
   * Updates local state immediately without waiting for backend confirmation
   */
  async gainPatternExperience(patternId: string, amount: number) {
    this.progressItems.update(items => {
      const item = items.find(item => item.patternId === patternId)
      if (item) {
        item.experience += amount
      } else {
        items.push({
          id: 'none',
          userId: get(this.user).id,
          patternId,
          initiallyLearnedAt: Date.now(),
          lastExperienceGainAt: Date.now(),
          lastLeveledAt: Date.now(),
          experience: amount
        })
      }

      return items
    })

    return this.api.gainExperience({ [patternId]: amount })
  }

  async reallyResetAllUserProgress() {
    const summary = await this.api.resetProgress()
    this.receiveProgress(summary)
  }


  allViewablePatterns = derived(this.admin,
    $admin => $admin ? sprachdex.patternsIncludingDrafts : sprachdex.publishedPatterns)

  progressItemByPatternId = derived(this.progressItems,
    $progressItems => _.keyBy($progressItems, (p) => p.patternId))

  patternsAndProgress = derived(
    [this.allViewablePatterns, this.progressItemByPatternId],
    ([$allViewablePatterns, $progressItemByPatternId]) => {
      return $allViewablePatterns.map(pattern => {
        return Object.assign({}, pattern, {
          progress: new PatternProgress(pattern, $progressItemByPatternId[pattern.id])
        })
      }) as PatternAndProgress[]
    }
  )

  patternAndProgressById = derived(this.patternsAndProgress,
    $patternsAndProgress => _.keyBy($patternsAndProgress, (p) => p.id))

  progressByPatternId = derived(this.patternsAndProgress,
    $patternsAndProgress => {
      const progressByPatternId: { [patternId: string]: PatternProgress } = {}
      for (const pattern of $patternsAndProgress) {
        progressByPatternId[pattern.id] = pattern.progress
      }
      return progressByPatternId
    }
  )

  nextPatternToLearn = derived(this.patternsAndProgress, $patternsAndProgress => {
    return $patternsAndProgress.find((p) => p.progress.experience === 0) as PatternAndProgress | undefined
  })

  /** All patterns for which the user has completed at least level 1 */
  learnedPatterns = derived(this.patternsAndProgress, $patternsAndProgress => {
    return $patternsAndProgress.filter(p => p.progress.experience > 0) as PatternAndProgress[]
  })

  /**
   * All learned patterns which are ready for levelup.
   * Ordered by previous review time, so the patterns you haven't
   * reviewed for the longest come first.
   */
  // patternsReadyToLevel = derived(this.learnedPatterns, $learnedPatterns => {
  //   const patterns = $learnedPatterns.filter(p => p.progress.levelableAt && p.progress.levelableAt <= Date.now())
  //   return _.sortBy(patterns, p => p.progress.levelableAt)
  // })

  // nextLevelablePattern = derived(this.learnedPatterns, $learnedPatterns => {
  //   const patterns = _.sortBy($learnedPatterns, p => p.progress.levelableAt)
  //   return patterns[0]
  // })

  /** Get exercises for all learned patterns, regardless of levelup availability */
  allAvailableExercises = derived(this.learnedPatterns, $learnedPatterns => {
    let reviews: Review[] = []
    for (const pattern of $learnedPatterns) {
      for (const exercise of pattern.exercises) {
        reviews.push(Object.assign({}, exercise, { pattern }))
      }
    }
    return reviews
  })

  restBonusAvailable = derived(this.progressItems, $progressItems => {
    if (!$progressItems.length) return false

    return $progressItems.every(item => {
      // Get the start (midnight) of the current day in user's timezone as UTC timestamp
      const date = new Date()
      date.setHours(0, 0, 0, 0)
      const startOfDay = date.valueOf()

      // User has rest bonus if they haven't practiced since start of day
      return item.lastExperienceGainAt < startOfDay
    })
  })

  totalExperience = derived(this.progressItems, $progressItems => {
    return $progressItems.reduce((total, item) => total + item.experience, 0)
  })

  /**
   * Patterns we think the user should review, based on how long it has
   * been since they last looked at them.
   */
  patternsToReview = derived(this.patternsAndProgress, $patternsAndProgress => {
    return $patternsAndProgress.filter(p =>
      p.progress.item && p.progress.item.lastExperienceGainAt < Date.now() - time.days(1))
  })

  nextThingToLearn: Readable<Learnable | undefined> = derived([this.patternsAndProgress, this.patternsToReview],
    ([$patternsAndProgress, $patternsToReview]) => {
      // First review anything that's ready for review
      let pattern = $patternsToReview[0]
      if (pattern) {
        return {
          type: 'exercises',
          pattern: pattern,
          why: `Reviewing ${pattern.title}`
        } as Learnable
      }

      // Next, level any patterns that are only level 1
      pattern = $patternsAndProgress.find(p => p.progress.level === 1 && p.exercises.length)
      if (pattern) {
        return {
          type: 'exercises',
          pattern: pattern,
          why: `${pattern.title}`
        } as Learnable
      }

      // Finally, learn a new pattern
      pattern = $patternsAndProgress.find(p => p.progress.level < 1)
      if (pattern) {
        return {
          type: 'dialogue',
          pattern: pattern,
          why: `${pattern.title}`
        } as Learnable
      }

      // Nothing left to learn!
      return undefined
    })

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