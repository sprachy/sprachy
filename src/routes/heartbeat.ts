// import { db } from "$lib/server/db"
// import { time } from "$lib/time"
// import { mailer } from "$lib/server/mailer"
// import { env } from "$lib/server/env"
import faunadb from "faunadb"
const q = faunadb.query

export async function get() {
  await heartbeatReviewReminders()
  return {
    body: {
      "❤️": true
    }
  }
}

export async function heartbeatReviewReminders() {
  //   const users = await db.users.query("users_by_remindable", true)

  //   for (const user of users) {
  //     const progress = await db.progress.listAllFor(user.id)
  //     const now = time.now()
  //     const availableForReview = progress.filter(p => {
  //       const levelableAt = p.lastLeveledAt + time.toNextSRSLevel(p.srsLevel)
  //       return levelableAt < now
  //     })

  //     if (availableForReview.length > 0) {
  //       await mailer.sendEmail({
  //         to: user.email,
  //         subject: `You have ${availableForReview.length} pattern${availableForReview.length === 1 ? '' : 's'} available to review on Sprachy`,
  //         text: `
  // Complete your reviews now: ${env.FRONTEND_BASE_URL}/practice
  //         `
  //       })
  //       await db.users.update(user.id, {
  //         lastReminderEmailSentAt: q.Now() as any
  //       })
  //     }
  //   }
}