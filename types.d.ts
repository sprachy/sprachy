import type { ZodIssue } from 'zod'
import type { MONTHLY_PRICE_ID, ANNUAL_PRICE_ID } from '$lib/constants'

// type LoginResult =
//   { status: 200, summary: ProgressSummary } |
//   { status: 422, code: 'validation failed', errors: ZodIssue[] } |
//   { status: 401, code: 'new user' } |
//   { status: 401, code: 'wrong password' }

// type SignupResult =
//   { status: 200, summary: ProgressSummary } |
//   { status: 422, code: 'validation failed', errors: ZodIssue[] } |
//   { status: 409, code: 'user already exists' }

declare global {
  type SignupDetails = {
    email: string
    password: string
    confirmPassword: string
  }

  type PriceId = typeof MONTHLY_PRICE_ID | typeof ANNUAL_PRICE_ID

  /**
   * User information available to the frontend.
   */
  type User = {
    id: string
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
    password: never
  }

  type ProgressItem = {
    id: string
    userId: string
    patternId: string
    initiallyLearnedAt: number
    lastExperienceGainAt: number
    lastLeveledAt: number
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

  /**
   * VQA intermediary result after running it through DeepL translation.
   */
  type TranslatedVQA = {
    questionId: number
    imageId: number
    question: {
      en: string
      de: string
    }
    answer: {
      en: string
      de: string
    }
  }

  /**
   * Result from a DAFlex POST request, after parsing the statistics string.
   * Used for tagging VQAs with CEFR levels.
   * https://cental.uclouvain.be/cefrlex/daflex/analyse/
   */
  type DAFlexResult = {
    cefr: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
    lemma: string
    pos: string
    sense: string
    statistics: {
      freq_A1: number
      freq_A2: number
      freq_B1: number
      freq_B2: number
      freq_C1: number
      freq_C2: number
    }
    token: string
  }

  /** Intermediary VQA result after tagging with DAFlex. */
  type TaggedVQA = TranslatedVQA & {
    daflex: DAFlexResult[]
  }

  /** The final from of the VQA used in production. */
  type VQAExercise = {
    questionId: number
    imageId: number
    question: {
      en: string
      de: string
    }
    choices: {
      en: string
      de: string
      correct: boolean
    }[]
  }
}