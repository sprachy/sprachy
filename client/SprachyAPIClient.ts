import _ from 'lodash'
import type { ProgressItem, User, ProgressSummary } from '../common/api'
import { HTTPProvider } from './HTTPProvider'

/**
 * Client for talking to the Sprachy backend API.
 * Makes various http requests to /api paths.
 * 
 * Each endpoint is wrapped as a method here, so
 * that the params and return type can be specified.
 */
export class SprachyAPIClient {
  http: HTTPProvider
  admin: AdminAPI
  constructor(http?: HTTPProvider) { 
    this.http = http || new HTTPProvider()
    this.admin = new AdminAPI(this.http)
  }

  async login({ email, password }: { email: string, password: string }): Promise<ProgressSummary> {
    const { data } = await this.http.post(`/api/login`, { email, password })
    return data
  }

  async signUp({ email, password }: { email: string, password: string }): Promise<ProgressSummary> {
    const { data } = await this.http.post(`/api/signup`, { email, password })
    return data
  }

  async logout(): Promise<void> {
    await this.http.post(`/api/logout`)
  }

  async getProgress(): Promise<ProgressSummary> {
    const { data } = await this.http.get(`/api/progress`)
    return data
  }

  async recordReview(patternId: string, remembered: boolean): Promise<ProgressItem | null> {
    const { data } = await this.http.post(`/api/progress`, { patternId, remembered })
    return data
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
    const { data } = await this.http.get(`/api/admin/users`)
    return data
  }
}

/**
 * Client-side representation of a Zod validation error from
 * the server.
 */
export class SprachyAPIValidationError extends Error {
  formErrors: string[]
  fieldErrors: { [key: string]: string[] }
  constructor(data: { formErrors: string[], fieldErrors: { [key: string]: string[] } }) {
    super(JSON.stringify(data))
    this.formErrors = data.formErrors
    this.fieldErrors = data.fieldErrors
  }

  get messagesByField() {
    const messages: { [key: string]: string } = {}
    for (const field in this.fieldErrors) {
      messages[field] = this.fieldErrors[field]!.join(", ")
    }
    return messages
  }
}