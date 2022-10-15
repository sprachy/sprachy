import _ from 'lodash'
import type { SprachyAPIClient } from "./SprachyAPIClient"
import type { ProgressItem, User, ProgressSummary } from "$lib/api"
import type { Pattern } from "$lib/Pattern"
import type { Exercise } from '$lib/Exercise'
import { sprachdex } from "$lib/sprachdex"
import { CanvasEffects } from "$lib/client/CanvasEffects"
import { SpeechSystem } from '$lib/SpeechSystem'
import { derived, get, writable, type Readable, type Writable } from 'svelte/store'
import { time } from '$lib/time'

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
  user: Writable<User> = writable({}) as any
  progressItems: Writable<ProgressItem[]> = writable([])

  learning: Writable<Learning | undefined> = writable(undefined)

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
        item.lastExperienceGainAt = Date.now()
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
    this.recalcCurrentLearning()
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

  totalExperience = derived(this.progressItems, $progressItems => {
    return $progressItems.reduce((total, item) => total + item.experience, 0)
  })

  /**
   * Patterns we think the user should review, based on how long it has
   * been since they last looked at them.
   */
  patternsToReview = derived(this.patternsAndProgress, $patternsAndProgress => {
    return $patternsAndProgress.filter(p =>
      p.progress.item && p.progress.level > 0 && p.progress.level < 9 && p.progress.item.lastExperienceGainAt < Date.now() - time.toNextSRSLevel(p.progress.level))
  })

  nextThingToLearn: Readable<Learning | undefined> = derived([this.patternsAndProgress, this.patternsToReview],
    ([$patternsAndProgress, $patternsToReview]) => {
      // First review anything that's ready for review
      if ($patternsToReview.length) {
        return {
          type: 'review',
          patterns: $patternsToReview,
          why: `Reviewing ${$patternsToReview.length} patterns`
        } as Learning
      }

      // Next, level any patterns that are only level 1 (completed dialogue but no exercises)
      let pattern = $patternsAndProgress.find(p => p.progress.level === 1 && p.exercises.length)
      if (pattern) {
        return {
          type: 'pattern',
          pattern: pattern,
          why: `${pattern.title}`,
          readExplanation: false
        } as Learning
      }

      // Finally, learn a new pattern
      pattern = $patternsAndProgress.find(p => p.progress.level < 1)
      if (pattern) {
        return {
          type: 'dialogue',
          pattern: pattern,
          why: `${pattern.title}`
        } as Learning
      }

      // Nothing left to learn!
      return undefined
    })

  async devTimeSkip() {
    this.receiveProgress(await this.api.devTimeSkip())
    this.recalcCurrentLearning()
  }

  async recalcCurrentLearning() {
    this.learning.update(() => get(this.nextThingToLearn))
  }

  async skipCurrentLearning() {
    const $learning = get(this.learning)
    if (!$learning) {
      return
    }

    if ($learning.type === 'dialogue') {
      await this.gainPatternExperience($learning.pattern.id, 1000)
    } else if ($learning.type === 'pattern') {
      await this.gainPatternExperience($learning.pattern.id, 1000)
    } else if ($learning.type === 'review') {
      for (const pattern of $learning.patterns) {
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