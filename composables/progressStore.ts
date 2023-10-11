import type { ProgressItem } from "@prisma/client"
import { keyBy } from "lodash"

type LocalProgressItem = Omit<ProgressItem, 'userId'> & {
  userId?: string
}

export const progressStore = defineState({
  user: null as User | null,
  progressItems: [] as LocalProgressItem[],

  get progressItemByPatternId() {
    return keyBy(this.progressItems, p => p.patternId)
  },

  /**
   * Gain an amount of experience in a given pattern
   * Updates local state immediately without waiting for backend confirmation
   */
  async gainPatternExperience(patternId: string, amount: number) {
    const item = this.progressItemByPatternId[patternId]
    if (item) {
      item.experience += amount
      item.lastExperienceGainAt = Date.now()
    } else {
      this.progressItems.push({
        userId: this.user?.id,
        patternId,
        initiallyLearnedAt: Date.now(),
        lastExperienceGainAt: Date.now(),
        experience: amount
      })
    }

    if (this.user)
      await api.reportProgress({
        experienceByPatternId: {
          [patternId]: amount
        }
      })
  }
})