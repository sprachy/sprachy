import { Session, SupabaseClient, User } from "@supabase/supabase-js"
import NProgress from 'accessible-nprogress'
import axios, { AxiosInstance } from 'axios'
NProgress.configure({ showSpinner: false })

export type Pattern = {
  id: number,
  title: string,
  slug: string,
  explanation: string
}

export type Progress = {
  user_id: number
  pattern_id: number
  srs_level: number
  initially_learned_at: number
  last_reviewed_at: number
}

async function request<T extends { error: { message: string }|null, data: any }, J = T & { data: NonNullable<T['data']> }>(query: PromiseLike<T>): Promise<J> {
  const promise = new Promise<T>((resolve, reject) => {
    query.then(res => {
      if (res.error) {
        reject(res.error)
      } else {
        resolve(res)
      }
    })
  })
  NProgress.promise(promise)
  return promise as any
}


export class UserAPI {
  constructor(readonly db: SupabaseClient) {}

  get user() {
    return this.db.auth.user()!
  }

  async signIn({ email, password }: { email: string, password: string }): Promise<Session> {
    const { user, session, error } = await request(this.db.auth.signIn({ email, password }))
    if (error) {
      throw new Error(error.message)
    } else if (!session) {
      throw new Error(`Received null Session from sign in`)
    } else {
      return session
    }
  }

  async signUp({ email, password }: { email: string, password: string }): Promise<User> {
    const { user, session, error } = await request(this.db.auth.signUp({ email, password }))
    if (error) {
      throw new Error(error.message)
    } else if (!user) {
      throw new Error(`Received null user from sign up`)
    } else {
      return user
    }
  }

  async getPattern(): Promise<Pattern> {
    const { data } = await request(this.db.from('patterns').select().single())
    return data
  }

  async setProgress(progress: { pattern_id: number, srs_level: number }): Promise<Progress> {
    const { data } = await request(this.db.from('progress').upsert({
      user_id: this.user.id,
      ...progress
    }))
    return data[0]
  }

  async getAllProgress(): Promise<Progress[]> {
    const { data } = await request(this.db.from('progress').select())
    return data
  }
}

export class AdminAPI {
  http: AxiosInstance
  constructor(readonly db: SupabaseClient) {
    this.http = axios.create({
      baseURL: "http://localhost:5999",
      timeout: 10000
    })
  }

  async listPatterns(): Promise<Pattern[]> {
    const { data } = await this.http.get(`/api/patterns`)
    console.log(data)
    return data
  }

  async createPattern(pattern: Omit<Pattern, 'id'>): Promise<Pattern> {
    const { data } = await this.http.post(`/api/patterns`, pattern)
    return data as any
  }

  async getPattern(patternId: number): Promise<Pattern> {
    const { data } = await this.http.get(`/api/patterns/${patternId}`)
    return data
  }

  async updatePattern(patternId: number, changes: Partial<Pattern>): Promise<Pattern> {
    const { data } = await this.http.patch(`/api/patterns/${patternId}`, changes)
    return data as any
  }

  async deletePattern(patternId: number): Promise<void> {
    await this.http.delete(`/api/patterns/${patternId}`)
  }
}