import NProgress from 'accessible-nprogress'
NProgress.configure({ showSpinner: false })
import axios, { TypedAxiosInstance } from 'restyped-axios'
import type {APISchema, Pattern, User} from '../common/api'

export type Progress = {
  user_id: number
  pattern_id: number
  srs_level: number
  initially_learned_at: number
  last_reviewed_at: number
}

export class UserAPI {
  http: TypedAxiosInstance<APISchema>
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:5999/api",
      timeout: 10000
    })
  }

  async signIn({ email, password }: { email: string, password: string }): Promise<User> {
    const { data } = await this.http.post(`/login`, { email, password })
    return data
  }

  async signUp({ email, password }: { email: string, password: string }): Promise<User> {
    const { data } = await this.http.post(`/signup`, { email, password })
    return data
  }

  async getNextPattern(): Promise<Pattern> {
    const { data } = await this.http.get(`/progress/nextLesson`)
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
  http: TypedAxiosInstance<APISchema>
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:5999/api/admin",
      timeout: 10000
    })
  }

  async listPatterns(): Promise<Pattern[]> {
    const { data } = await this.http.get(`/patterns`)
    return data
  }

  async createPattern(pattern: Omit<Pattern, 'id'>): Promise<Pattern> {
    const { data } = await this.http.post(`/patterns`, pattern)
    return data
  }

  async getPattern(patternId: string): Promise<Pattern> {
    const { data } = await this.http.get<`/patterns/:id`>(`/patterns/${patternId}`)
    return data
  }

  async updatePattern(patternId: string, changes: Partial<Pattern>): Promise<Pattern> {
    const { data } = await this.http.patch<`/patterns/:id`>(`/patterns/${patternId}`, changes)
    return data
  }

  async deletePattern(patternId: string): Promise<void> {
    await this.http.delete<`/patterns/:id`>(`/patterns/${patternId}`)
  }
}