import type { ZodIssue } from 'zod'
import type { MONTHLY_PRICE_ID, ANNUAL_PRICE_ID } from '$lib/constants'

// export type LoginResult =
//   { status: 200, summary: ProgressSummary } |
//   { status: 422, code: 'validation failed', errors: ZodIssue[] } |
//   { status: 401, code: 'new user' } |
//   { status: 401, code: 'wrong password' }

// export type SignupResult =
//   { status: 200, summary: ProgressSummary } |
//   { status: 422, code: 'validation failed', errors: ZodIssue[] } |
//   { status: 409, code: 'user already exists' }

export type SignupDetails = {
  email: string
  password: string
  confirmPassword: string
  wantsReminderEmails: boolean
}

export type PriceId = typeof MONTHLY_PRICE_ID | typeof ANNUAL_PRICE_ID

export type User = {
  id: string
  email: string
  displayName: string
  username?: string
  bio: string
  pfp: string
  isAdmin: boolean
  lastReminderEmailSentAt?: number
  lastReviewAt?: number
  wantsReminderEmails?: boolean
  enableSpeechSynthesis?: boolean
  customerId?: string
  subscription?: {
    priceId: PriceId
    subscriptionId: string
    customerId: string
    subscribedAt: number
  }
}

export type ProgressItem = {
  id: string
  userId: string
  patternId: string
  storyLine: number
}

/**
 * Package of initial information sent to the frontend
 * on login/signup
 */
export type ProgressSummary = {
  user: User
  progressItems: ProgressItem[]
}