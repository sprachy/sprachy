import { SupabaseClient } from '@supabase/supabase-js'

export class AdminAPI {
  constructor(readonly db: SupabaseClient) {}

  async createPattern() {
    const { data, error } = await this.db.from('patterns').insert([{}])

    if (error)
      console.error(error)
  }
}