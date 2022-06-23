import { test, expect } from "vitest"
import { testenv } from './testenv'
import { sprachdex } from '../src/lib/sprachdex'
import { db } from "$lib/server/db"
import { time } from "$lib/time"

test("srs progress updates", async () => {
  const asUser = await testenv.asUser()

  await db.progress.resetFor(asUser.user.id)

  // Initial state, no progress recorded
  const summary = await asUser.api.getProgress()
  expect(summary.user).toBeDefined()
  expect(summary.progressItems).toEqual([])

  // User learns about a pattern
  // const pattern = sprachdex.publishedPatterns[0]!
  // const progress1 = (await asUser.api.completeLevel(pattern.id, 1))!
  // expect(progress1.srsLevel === 1)

  // // Gotta wait before we can level again
  // const progress2 = (await asUser.api.completeLevel(pattern.id, 2))!
  // expect(progress2.srsLevel === 1)

  // // Wait for 4 hours
  // await db.progress.update(progress2.id, {
  //   lastLeveledAt: progress2.lastLeveledAt - time.hours(4),
  // })

  // // Now we can level up
  // const progress3 = (await asUser.api.completeLevel(pattern.id, 2))!
  // expect(progress3.srsLevel === 2)
})
