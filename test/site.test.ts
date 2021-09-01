import { supabase } from '../src/supabase'

describe('testy test', () => {
    it('does some stuff', async () => {
      const { error, data } = await supabase.auth.signUp({ email: "waffles@mispy.me", password: "manydeliciouswaffles" })
      expect(error).toBe(null)
    })
})