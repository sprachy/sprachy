import { getClients } from './helpers'

test('does some stuff', async () => {
  const { asUser } = await getClients()

  const { error, data } = await asUser.supabase.from("patterns").insert([{}])
  expect(error).toBe(null)
})