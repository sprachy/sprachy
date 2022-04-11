import { db } from "$lib/server/db"
import { sprachdex } from "$lib/sprachdex"
import { time } from "$lib/time"
import { test, expect } from "vitest"
import { testenv } from "./testenv"

test("sending reminder emails", async () => {
  // const asUser = await testenv.asUser()

  // const pattern = sprachdex.publishedPatterns[0]!
  // const progress = (await asUser.api.completeLevel(pattern.id, 1))!
  // expect(progress.srsLevel === 1)

  // // Wait for 4 hours
  // await db.progress.update(progress.id, {
  //   lastLeveledAt: progress.lastLeveledAt - time.hours(4),
  // })
})
