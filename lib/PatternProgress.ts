import type { PatternId } from "./Pattern"
import type { ProgressStore } from "~/composables/progressStore"

export class PatternProgress {
  constructor(readonly progressStore: ProgressStore, readonly patternId: PatternId) { }

  get item() {
    return this.progressStore.progressItemByPatternId[this.patternId]
  }

  get experience() {
    return this.item?.experience || 0
  }

  get level() {
    return Math.floor(this.experience / 1000)
  }
}