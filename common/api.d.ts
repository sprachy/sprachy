export type User = {
  id: string
  email: string
  isAdmin: boolean
}

export type ProgressItem = {
  id: string
  userId: string
  patternId: string
  initiallyLearnedAt: number
  lastLeveledAt: number
  lastReviewedAt: number
  srsLevel: number
}

/**
 * Package of initial information sent to the frontend
 * on login/signup
 */
export type ProgressSummary = {
  user: User
  progressItems: ProgressItem[]
}