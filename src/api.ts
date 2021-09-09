import { Session, SupabaseClient, User } from "@supabase/supabase-js"
import { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder"
import NProgress from 'accessible-nprogress'
import { PostgrestBuilder, PostgrestResponse, PostgrestSingleResponse } from "@supabase/postgrest-js"

export type Pattern = {
  id: number,
  title: string,
  slug: string,
  explanation: string
}

export class UserAPI {
  constructor(readonly db: SupabaseClient) {}

  async signIn({ email, password }: { email: string, password: string }): Promise<Session> {
    const { user, session, error } = await this.db.auth.signIn({ email, password })
    if (error) {
      throw new Error(error.message)
    } else if (!session) {
      throw new Error(`Received null Session from sign in`)
    } else {
      return session
    }
  }

  async signUp({ email, password }: { email: string, password: string }): Promise<User> {
    const { user, session, error } = await this.db.auth.signUp({ email, password })
    if (error) {
      throw new Error(error.message)
    } else if (!user) {
      throw new Error(`Received null user from sign up`)
    } else {
      return user
    }
  }
}

export class AdminAPI {
  constructor(readonly db: SupabaseClient) {}

  async request<T, J extends PostgrestResponse<T> | PostgrestSingleResponse<T>>(query: PromiseLike<J>): Promise<NonNullable<J['data']>> {
    const promise = new Promise<J>((resolve, reject) => {
      query.then(res => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res)
        }
      })
    })
    NProgress.promise(promise)
    const { data } = await promise
    return data! as NonNullable<J['data']>
  }

  async listPatterns(): Promise<Pattern[]> {
    return this.request(this.db.from('patterns').select().order("id"))
  }

  async createPattern(pattern: Omit<Pattern, 'id'>): Promise<Pattern> {
    const patterns = await this.request(this.db.from('patterns').insert(pattern))
    return patterns[0]
  }

  async getPattern(patternId: number): Promise<Pattern> {
    return this.request(this.db.from('patterns').select().match({ id: patternId }).single())
  }

  async updatePattern(patternId: number, changes: Partial<Pattern>): Promise<Pattern> {
    const patterns = await this.request(this.db.from('patterns').update(changes).match({ id: patternId }))
    return patterns[0]
  }

  async deletePattern(patternId: number): Promise<void> {
    await this.request(this.db.from('patterns').delete().match({ id: patternId }))
  }
}