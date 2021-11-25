
import { testenv } from './testenv'
import time from '../common/time'
import { db } from '../server/db'

test('srs progress updates', async () => {
  const { asUser } = await testenv()

  // User gets their first lesson
  const pattern = await asUser.api.getNextPattern()
  expect(pattern.slug).toEqual("die-der-das")

  // User learns about the pattern
  const progress1 = await asUser.api.recordReview(pattern.id, true)
  expect(progress1.srsLevel === 1)

  // Doesn't get the same pattern next time
  // const pattern2 = await asUser.api.getNextPattern()
  // expect(pattern2.slug).not.toEqual("die-der-das")

  // It's not time to review yet; shouldn't see any reviews
  const status = await asUser.api.getStatus()
  expect(status.numReviews).toBe(0)

  // Recording review does nothing
  const progress2 = await asUser.api.recordReview(pattern.id, true)
  expect(progress2.srsLevel === 1)

  // Wait for 4 hours
  await db.progress.update(progress2.id, {
    lastReviewedAt: progress2.lastReviewedAt - time.hours(4)
  })

  // Now we get a review
  const { reviews } = await asUser.api.getReviews()
  expect(reviews.length).toBe(1)

  // And we can record progress
  const progress3 = await asUser.api.recordReview(pattern.id, true)
  expect(progress3.srsLevel === 2)

  // // User can insert a new progress item for their own id
  // var progress = await asUser.api.setProgress({
  //   pattern_id: pattern.id,
  //   srs_level: 3
  // })
  // expect(progress.srs_level).toBe(3)

  // // User can update that progress item using the same method
  // var progress = await asUser.api.setProgress({
  //   pattern_id: pattern.id,
  //   srs_level: 4
  // })
  // expect(progress.srs_level).toBe(4)

  // // User can retrieve their own progress (only)
  // var allProgress = await asUser.api.getAllProgress()
  // expect(allProgress.length).toBe(1)
  // expect(allProgress[0].srs_level).toBe(4)

  // var { data, error } = await asUser.db.from("progress").insert([{
  //   user_id: asUser.session.user!.id,
  //   pattern_id: pattern.id,
  //   srs_level: 0
  // }])
  // expect(error).toBe(null)

  // // User can't insert a new progress item for someone else's id
  // var { data, error } = await asUser.db.from("progress").insert([{
  //   user_id: asAdmin.user.id,
  //   pattern_id: pattern.id,
  //   srs_level: 0
  // }])
  // expect(error?.message).toContain("violates row-level security policy")
})