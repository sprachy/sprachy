import type { ProgressItem } from "$lib/api"
import type { Pattern } from "$lib/Pattern"
import { time } from "$lib/time"

export class PatternProgress {
  constructor(readonly pattern: Pattern, readonly item?: ProgressItem) { }

  get storyCompleted() {
    return !!this.item?.storyCompletedAt
  }

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