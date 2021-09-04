import { Session, SupabaseClient } from "@supabase/supabase-js"


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
    console.log(user, session)
    if (error) {
      throw new Error(error.message)
    } else {
      return user
    }
  }

  async createPattern() {
    const { data, error } = await this.db.from('patterns').insert([{}])

    console.log(data)
    if (error)
      console.error(error)
  }
}