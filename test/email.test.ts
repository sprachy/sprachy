import { db } from "$lib/server/db"
import { sprachdex } from "$lib/sprachdex"
import { time } from "$lib/time"
import { heartbeatReviewReminders } from "src/routes/heartbeat/+server"
import { test, expect } from "vitest"
import { testenv } from "./testenv"
import { mailer } from "$lib/server/mailer"

test("sending reminder emails", async () => {
  // const asUser = await testenv.asUser({ wantsReminderEmails: true })

  // // Complete a pattern
  // const pattern = sprachdex.publishedPatterns[0]!
  // const progress = (await asUser.api.completeLevel(pattern.id, 1))!
  // expect(progress.srsLevel === 1)

  // // No emails sent since it's not time yet
  // await heartbeatReviewReminders()
  // expect(mailer.testMailsSentTo(asUser.user.email)).toHaveLength(0)

  // // Pretend we completed it 4 hours ago
  // await db.progress.update(progress.id, {
  //   lastLeveledAt: progress.lastLeveledAt - time.hours(4),
  // })

  // // Now an email is sent
  // await heartbeatReviewReminders()
  // const emails = mailer.testMailsSentTo(asUser.user.email)
  // expect(emails).toHaveLength(1)
  // const email = emails[0]!
  // expect(email.subject).toContain("1 pattern available to review")

  // // Doesn't send a duplicate email
  // await heartbeatReviewReminders()
  // expect(mailer.testMailsSentTo(asUser.user.email)).toHaveLength(1)

})
