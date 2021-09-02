import { dbenv } from './dbenv'

test('pattern access rules', async () => {
  const { asService, asUser, asAdmin } = await dbenv()

  const res1 = await asAdmin.supabase.from("patterns").insert([{
    slug: "die-der-das",
    title: "Die, der, das"
  }])
  expect(res1.error).toBe(null)

  const { error, data } = await asUser.supabase.from("patterns").select()
  expect(error).toBe(null)
  console.log(data)
})