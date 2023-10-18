// import type { MONTHLY_PRICE_ID, ANNUAL_PRICE_ID } from '~/lib/constants'

// type LoginResult =
//   { status: 200, summary: ProgressSummary } |
//   { status: 422, code: 'validation failed', errors: ZodIssue[] } |
//   { status: 401, code: 'new user' } |
//   { status: 401, code: 'wrong password' }

// type SignupResult =
//   { status: 200, summary: ProgressSummary } |
//   { status: 422, code: 'validation failed', errors: ZodIssue[] } |
//   { status: 409, code: 'user already exists' }

type SignupDetails = {
  email: string
  password: string
  confirmPassword: string
}

// type PriceId = typeof MONTHLY_PRICE_ID | typeof ANNUAL_PRICE_ID

/**
 * User information available to the frontend.
 */
type User = {
  id: number
  email: string
  displayName?: string
  username?: string
  bio?: string
  pfp?: string
  isAdmin: boolean
  lastReminderEmailSentAt?: number
  lastExperienceGainAt?: number
  wantsReminderEmails?: boolean
  enableSpeechSynthesis?: boolean
}

type UserWithProgress = User & {
  progressItems: ProgressItem[]
}

type ProgressItem = {
  userId: number
  patternId: string
  initiallyLearnedAt: number
  lastExperienceGainAt: number
  experience: number
}

/**
 * Package of initial information sent to the frontend
 * on login/signup
 */
type ProgressSummary = {
  user: User
  progressItems: ProgressItem[]
}