import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import type { Progress, Pattern, User } from '../common/api'
import { IS_PRODUCTION } from './settings'

async function delay(amount: number) {
  return new Promise(resolve => {
    _.delay(resolve, amount)
  })
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
    const promise = this.axios.request(config)
    this.ongoingRequests.push(promise)

    return promise.finally(() => {
      this.ongoingRequests = this.ongoingRequests.filter(r => r !== promise)
    })
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

export class UserAPI {
  admin: AdminAPI = new AdminAPI(this.http)
  constructor(readonly http: HTTPProvider) { }

  async signIn({ email, password }: { email: string, password: string }): Promise<User> {
    const { data } = await this.http.post(`/login`, { email, password })
    return data
  }

  async signUp({ email, password }: { email: string, password: string }): Promise<User> {
    const { data } = await this.http.post(`/signup`, { email, password })
    return data
  }

  async logout(): Promise<void> {
    await this.http.post(`/logout`)
  }

  async getNextPattern(): Promise<Pattern | null> {
    const { data } = await this.http.get(`/progress/nextLesson`)
    return data
  }

  async getStatus(): Promise<{ user: User }> {
    const { data } = await this.http.get(`/status`)
    return data
  }

  async recordReview(patternId: string, remembered: boolean): Promise<Progress> {
    const { data } = await this.http.post(`/progress`, { patternId, remembered })
    return data
  }

  // async setProgress(progress: { pattern_id: number, srs_level: number }): Promise<Progress> {
  //   const { data } = await request(this.db.from('progress').upsert({
  //     user_id: this.user.id,
  //     ...progress
  //   }))
  //   return data[0]
  // }

  // async getAllProgress(): Promise<Progress[]> {
  //   const { data } = await request(this.db.from('progress').select())
  //   return data
  // }
}


export class AdminAPI {
  constructor(readonly http: HTTPProvider) { }

  async listPatterns(): Promise<Pattern[]> {
    const { data } = await this.http.get(`/admin/patterns`)
    return data
  }

  async createPattern(pattern: Omit<Pattern, 'id'>): Promise<Pattern> {
    const { data } = await this.http.post(`/admin/patterns`, pattern)
    return data
  }

  async getPattern(patternId: string): Promise<Pattern> {
    const { data } = await this.http.get(`/admin/patterns/${patternId}`)
    return data
  }

  async updatePattern(patternId: string, changes: Partial<Pattern>): Promise<Pattern> {
    const { data } = await this.http.patch(`/admin/patterns/${patternId}`, changes)
    return data
  }

  async deletePattern(patternId: string): Promise<void> {
    await this.http.delete(`/admin/patterns/${patternId}`)
  }

  async listUsers(): Promise<User[]> {
    const { data } = await this.http.get(`/admin/users`)
    return data
  }
}