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

test('srs progress updates', async () => {
  const { asService, asUser, asAdmin } = await dbenv()

  const pattern = await asAdmin.adminApi.createPattern({
    slug: "die-der-das",
    title: "Die, der, das",
    explanation: "stuff!"
  })

  // User can insert a new progress item for their own id
  var progress = await asUser.api.setProgress({
    pattern_id: pattern.id,
    srs_level: 3
  })
  expect(progress.srs_level).toBe(3)

  // User can update that progress item using the same method
  var progress = await asUser.api.setProgress({
    pattern_id: pattern.id,
    srs_level: 4
  })
  expect(progress.srs_level).toBe(4)

  // User can retrieve their own progress (only)
  var allProgress = await asUser.api.getAllProgress()
  expect(allProgress.length).toBe(1)
  expect(allProgress[0].srs_level).toBe(4)

  var { data, error } = await asUser.db.from("progress").insert([{
    user_id: asUser.session.user!.id,
    pattern_id: pattern.id,
    srs_level: 0
  }])
  expect(error).toBe(null)

  // User can't insert a new progress item for someone else's id
  var { data, error } = await asUser.db.from("progress").insert([{
    user_id: asAdmin.user.id,
    pattern_id: pattern.id,
    srs_level: 0
  }])
  expect(error?.message).toContain("violates row-level security policy")
})