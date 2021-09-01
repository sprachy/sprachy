import { supabase } from './supabase'

export class AdminAPI {
  async createPattern() {
    const { data, error } = await supabase.from('patterns').insert([{}])

    console.log(data)
    if (error)
      console.error(error)
  }
}