import { test, expect } from "vitest"
import { testenv } from "./testenv"
import { v4 as uuid } from "uuid"

test("sign up for Sprachy", async () => {
  const asRando = await testenv.asRando()

  const email = `twodork+${uuid()}@sprachy.com`

  await asRando.api.signUp({
    email: email,
    password: "yuhyuhyuhyuh",
    confirmPassword: "yuhyuhyuhyuh",
    wantsReminderEmails: false
  })

  const summary = await asRando.api.getProgress()
  expect(summary.user.email).toBe(email)

  // Try logging out
  await asRando.api.logout()

  let error: any = null
  try {
    await asRando.api.getProgress()
  } catch (err: any) {
    error = err
  }
  expect(error).not.toBe(null)

  // And logging in again
  await asRando.api.login({
    email: email,
    password: "yuhyuhyuhyuh"
  })

  const summary2 = await asRando.api.getProgress()
  expect(summary2.user.email).toBe(email)
})
