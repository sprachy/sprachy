import _ from 'lodash'
import type { ProgressItem, User, ProgressSummary, LoginResult, SignupResult } from '../common/api'
import { HTTPProvider, safeRequest } from './HTTPProvider'

export class SprachyAPIClient {
  http: HTTPProvider
  admin: AdminAPI
  constructor(http?: HTTPProvider) {
    this.http = http || new HTTPProvider()
    this.admin = new AdminAPI(this.http)
  }

  async login({ email, password }: { email: string, password: string }): Promise<LoginResult> {
    return safeRequest(this.http.post(`/api/login`, { email, password }))
  }

  async signUp({ email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }): Promise<SignupResult> {
    return safeRequest(this.http.post(`/api/signup`, { email, password, confirmPassword }))
  }

  async logout(): Promise<void> {
    return this.http.post(`/api/logout`)
  }

  async getProgress(): Promise<ProgressSummary> {
    return this.http.get(`/api/progress`)
  }

  async recordReview(patternId: string, remembered: boolean): Promise<ProgressItem | null> {
    return this.http.post(`/api/progress`, { patternId, remembered })
  }

  async debugResetProgress(): Promise<ProgressSummary> {
    return this.http.post(`/api/debug/reset-progress`)
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