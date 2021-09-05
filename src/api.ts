import { Session, SupabaseClient, User } from "@supabase/supabase-js"


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

  async listPatterns(): Promise<Pattern[]> {
    const { data, error } = await this.db.from('patterns').select().order("id")
    if (error) {
      throw new Error(error.message)
    } else {
      return data!
    }
  }

  async createPattern(pattern: Omit<Pattern, 'id'>): Promise<Pattern> {
    const { data, error } = await this.db.from('patterns').insert(pattern)
    if (error) {
      throw new Error(error.message)
    } else {
      return data![0]
    }
  }

  async getPattern(patternId: number): Promise<Pattern> {
    const { data, error } = await this.db.from('patterns').select().match({ id: patternId }).single()
    if (error) {
      throw new Error(error.message)
    } else {
      return data
    }
  }

  async updatePattern(patternId: number, changes: Partial<Pattern>): Promise<Pattern> {
    const { data, error } = await this.db.from('patterns').update(changes).match({ id: patternId })
    if (error) {
      throw new Error(error.message)
    } else {
      return data![0]
    }
  }

  async deletePattern(patternId: number): Promise<void> {
    const { error } = await this.db.from('patterns').delete().match({ id: patternId })
    if (error) {
      throw new Error(error.message)
    }
  }
}