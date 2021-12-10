import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import type { ProgressItem, User, ProgressSummary } from '../common/api'
import { IS_PRODUCTION } from './settings'

export class UserAPI {
  admin: AdminAPI = new AdminAPI(this.http)
  constructor(readonly http: HTTPProvider) { }

  async signIn({ email, password }: { email: string, password: string }): Promise<ProgressSummary> {
    const { data } = await this.http.post(`/login`, { email, password })
    return data
  }

  async signUp({ email, password }: { email: string, password: string }): Promise<ProgressSummary> {
    const { data } = await this.http.post(`/signup`, { email, password })
    return data
  }

  async logout(): Promise<void> {
    await this.http.post(`/logout`)
  }

  async getProgress(): Promise<ProgressSummary> {
    const { data } = await this.http.get(`/progress`)
    return data
  }

  async recordReview(patternId: string, remembered: boolean): Promise<ProgressItem | null> {
    const { data } = await this.http.post(`/progress`, { patternId, remembered })
    return data
  }
}

export class AdminAPI {
  constructor(readonly http: HTTPProvider) { }

  async listUsers(): Promise<User[]> {
    const { data } = await this.http.get(`/admin/users`)
    return data
  }
}

async function delay(amount: number) {
  return new Promise(resolve => {
    _.delay(resolve, amount)
  })
}

/**
 * Client-side representation of a Zod validation error from
 * the server
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

export class HTTPProvider {
  axios: AxiosInstance
  ongoingRequests: Promise<any>[] = []
  constructor(config: { baseURL?: string } = {}) {
    this.axios = axios.create({
      baseURL: config.baseURL || '/api',
      timeout: 10000
    })

    if (!IS_PRODUCTION) {
      // In development, delay all requests by a small random amount to simulate live user experience.
      // This helps with dev-prod parity so that we remember to do good loading behavior.
      this.axios.interceptors.response.use(async response => {
        // Numbers are based on how long API requests take for me on GitHub, which uses
        // a similar kind of loading indicator to us
        await delay(_.random(200, 700))
        return response
      })
    }
  }

  async request(config: AxiosRequestConfig): Promise<any> {
    const promise = this.axios.request(config).finally(() => {
      this.ongoingRequests = this.ongoingRequests.filter(r => r !== promise)
    })
    this.ongoingRequests.push(promise)

    try {
      return await promise
    } catch (err: any) {
      if (err?.response?.data?.fieldErrors) {
        throw new SprachyAPIValidationError(err.response.data)
      } else {
        throw err
      }
    }
  }

  async get(path: string): Promise<any> {
    return this.request({ method: 'GET', url: path })
  }

  async post(path: string, data?: any, opts: AxiosRequestConfig = {}): Promise<any> {
    return this.request(Object.assign({ method: 'POST', url: path, data: data }, opts))
  }

  async put(path: string, data?: any): Promise<any> {
    return this.request({ method: 'PUT', url: path, data: data })
  }

  async patch(path: string, data: any): Promise<any> {
    return this.request({ method: 'PATCH', url: path, data: data })
  }

  async delete(path: string): Promise<any> {
    return this.request({ method: 'DELETE', url: path })
  }
}