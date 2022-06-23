import _ from 'lodash'
import type { ProgressItem, User, ProgressSummary, SignupDetails, PriceId } from '$lib/api'
import { HTTPProvider } from './HTTPProvider'
import type { VoiceSynthesisRequestSchema } from '$lib/../routes/api/synthesize'

export class SprachyAPIClient {
  http: HTTPProvider
  admin: AdminAPI
  constructor(http?: HTTPProvider) {
    this.http = http || new HTTPProvider()
    this.admin = new AdminAPI(this.http)
  }

  async signUp(deets: SignupDetails): Promise<{ summary: ProgressSummary }> {
    return this.http.post(`/signup`, deets)
  }

  async login({ email, password }: { email: string, password: string }): Promise<{ summary: ProgressSummary }> {
    return this.http.post(`/login`, { email, password })
  }

  async logout() {
    await this.http.get(`/logout`)
  }

  async sendPasswordResetEmail(email: string) {
    return this.http.post(`/reset-password`, { email })
  }

  async confirmPasswordReset({ token, newPassword, confirmPassword }: { token: string, newPassword: string, confirmPassword: string }) {
    return this.http.post(`/confirm-reset-password`, { token, newPassword, confirmPassword })
  }

  async getProgress(): Promise<ProgressSummary> {
    return this.http.get(`/api/progress`)
  }

  async gainExperience(experienceByPatternId: Record<string, number>): Promise<ProgressItem[]> {
    return this.http.post(`/api/progress`, experienceByPatternId)
  }

  async changeEmail(newEmail: string) {
    return this.http.post(`/api/settings/account/change-email`, { newEmail })
  }

  async confirmEmailChange(token: string) {
    return this.http.post(`/api/settings/account/confirm-email-change`, { token })
  }

  async patchSettings(settings: Pick<User, 'wantsReminderEmails' | 'enableSpeechSynthesis'>): Promise<User> {
    return this.http.patch(`/api/settings/account/settings`, settings)
  }

  async patchProfile(changes: Partial<Pick<User, 'username' | 'displayName' | 'bio' | 'pfp'>>) {
    return this.http.patch(`/api/settings/profile/patch-profile`, changes)
  }

  async subscribe(priceId: PriceId): Promise<{ 'checkoutSessionId': string } | { 'user': User }> {
    return this.http.post(`/api/settings/subscription`, { priceId })
  }

  async makeProfile(settings: { displayName: string }) {
    return this.http.post(`/api/settings/profile/make-profile`, settings)
  }

  async synthesizeSpeech(options: VoiceSynthesisRequestSchema) {
    return this.http.post(`/api/synthesize`, options)
  }
}

/**
 * API methods that are only accessible to admin users.
 * 
 * Security is handled by the backend, they're only
 * separated from the rest here for the sake of neatness.
 */
export class AdminAPI {
  constructor(readonly http: HTTPProvider) { }

  async listUsers(): Promise<User[]> {
    return this.http.get(`/api/admin/users`)
  }
}