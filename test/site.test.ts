import { dbenv } from './dbenv'

test('pattern access rules', async () => {
  const { db, asUser, asAdmin } = await dbenv()


  const { error, data } = await asUser.supabase.from("patterns").select()
  expect(error).toBe(null)
})