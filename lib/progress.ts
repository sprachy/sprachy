
/**
 * Given two sets of user progress, combine them such that
 * progress from each is gained and no progress is lost.
 */
export function combineProgress(progressItems: ProgressItem[], otherProgressItems: ProgressItem[]): ProgressItem[] {
  const progressItemsByPatternId: Record<string, ProgressItem> = {}

  for (const item of progressItems) {
    progressItemsByPatternId[item.patternId] = item
  }
  for (const item of otherProgressItems) {
    const existingItem = progressItemsByPatternId[item.patternId]
    if (!existingItem) {
      progressItemsByPatternId[item.patternId] = item
    } else if (item.experience > existingItem.experience || (item.experience >= existingItem.experience && item.lastExperienceGainAt < existingItem.lastExperienceGainAt)) {
      progressItemsByPatternId[item.patternId] = item
    }
  }

  return Object.values(progressItemsByPatternId)
}