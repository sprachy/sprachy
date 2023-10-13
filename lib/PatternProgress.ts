import type { Pattern } from "./Pattern"

export class PatternProgress {
  constructor(readonly pattern: Pattern, readonly item?: ProgressItem) { }

  get experience() {
    return this.item?.experience || 0
  }

  get level() {
    return Math.floor(this.experience / 1000)
  }
}