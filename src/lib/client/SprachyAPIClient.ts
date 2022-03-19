import _ from 'lodash'
import type { ProgressItem, User, ProgressSummary } from '$lib/api'
import { HTTPProvider } from './HTTPProvider'

export class SprachyAPIClient {
  http: HTTPProvider
  admin: AdminAPI
  constructor(http?: HTTPProvider) {
    this.http = http || new HTTPProvider()
    this.admin = new AdminAPI(this.http)
  }

  async login({ email, password }: { email: string, password: string }): Promise<{ summary: ProgressSummary }> {
    return this.http.post(`/login`, { email, password })
  }

  async sendPasswordResetEmail(email: string) {
    return this.http.post(`/reset-password`, { email })
  }

  async confirmPasswordReset({ token, newPassword, confirmPassword }: { token: string, newPassword: string, confirmPassword: string }) {
    return this.http.post(`/confirm-reset-password`, { token, newPassword, confirmPassword })
  }

  // async signUp({ email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }): Promise<{ summary: ProgressSummary }> {
  //   return this.http.post(`/api/signup`, { email, password, confirmPassword })
  // }

  async getProgress(): Promise<ProgressSummary> {
    return this.http.get(`/api/progress`)
  }

  async completeLevel(patternId: string, level: number): Promise<ProgressItem | null> {
    return this.http.post(`/api/progress`, { patternId, level })
  }

  async changeEmail(newEmail: string) {
    return this.http.post(`/api/account/change-email`, { newEmail })
  }

  async confirmEmailChange(token: string) {
    return this.http.post(`/api/account/confirm-email-change`, { token })
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