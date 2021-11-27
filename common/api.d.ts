export type User = {
  id: string
  email: string
  isAdmin: boolean
}

export type Pattern = {
  id: string
  title: string
  slug: string
  explanation: string
  exercises: {
    content: string
  }[]
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

export type Exercise = Pattern['exercises'][0]

/**
 * Package of initial information sent to the frontend
 * on login/signup
 */
export type ProgressSummary = {
  user: User
  progressItems: ProgressItem[]
}