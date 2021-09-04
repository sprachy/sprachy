import { dbenv, UserClient } from './dbenv'

async function canSeePattern(patternId: number, asClient: UserClient) {
  const { data } = await asClient.db.from("patterns").select().match({ id: patternId })
  return data!.length === 1
}

async function canUpdatePattern(patternId: number, asClient: UserClient) {
  await asClient.db.from("patterns").update({ slug: 'rawr' }).match({ id: patternId })
  const { data } = await asClient.db.from("patterns").select().match({ id: patternId }).single()
  return data!.slug === 'rawr'
}

async function canDeletePattern(patternId: number, asClient: UserClient) {
  const { asService } = await dbenv()
  await asClient.db.from("patterns").delete().match({ id: patternId })
  const { data } = await asService.db.from("patterns").select().match({ id: patternId })
  return data!.length === 0
}

test('pattern access rules', async () => {
  const { asService, asUser, asAdmin } = await dbenv()

  // Admin can create patterns
  const res1 = await asAdmin.db.from("patterns").insert([{
    slug: "die-der-das",
    title: "Die, der, das",
    explanation: "stuff!"
  }])
  const patternId = res1.data![0].id
  expect(res1.status).toBe(201)

  // Non-admin can't create pattern
  const res2 = await asUser.db.from("patterns").insert([{
    slug: "ohno",
    title: "Malicious things",
    explanation: "aaa"
  }])
  expect(res2.status).toBe(403)

  // Anyone can see pattern
  expect(await canSeePattern(patternId, asUser)).toBe(true)
  expect(await canSeePattern(patternId, asAdmin)).toBe(true)

  // Only admins can update pattern
  expect(await canUpdatePattern(patternId, asUser)).toBe(false)
  expect(await canUpdatePattern(patternId, asAdmin)).toBe(true)
 
  // Only admins can delete patterns
  expect(await canDeletePattern(patternId, asUser)).toBe(false)
  expect(await canDeletePattern(patternId, asAdmin)).toBe(true)
})