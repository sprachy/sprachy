import { dbenv } from './dbenv'

test('pattern access rules', async () => {
  const { asService, asUser, asAdmin } = await dbenv()

  
  // Admin can create patterns
  const res1 = await asAdmin.db.from("patterns").insert([{
    slug: "die-der-das",
    title: "Die, der, das"
  }])
  expect(res1.error).toBe(null)

  // Non-admin can't create pattern
  const res2 = await asUser.db.from("patterns").insert([{
    slug: "ohno",
    title: "Malicious things"
  }])
  expect(res2.error).not.toBe(null)

  const { error, data } = await asUser.db.from("patterns").select()
  expect(error).toBe(null)
  console.log(data)
})