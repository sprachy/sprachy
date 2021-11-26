
import { testenv } from './testenv'
import time from '../common/time'
import { db } from '../server/db'

test('srs progress updates', async () => {
  const { asUser } = await testenv()
  const summary = await asUser.api.getProgress()

  // User gets their first lesson
  expect(pattern.explanation).toBeDefined()

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
})