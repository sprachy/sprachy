import { testenv } from "./testenv"

test("sign up for Sprachy", async () => {
  const { asRando } = await testenv()

  await asRando.api.signUp({
    email: "twodork@sprachy.com",
    password: "yuhyuhyuhyuh",
    confirmPassword: "yuhyuhyuhyuh"
  })

  const summary = await asRando.api.getProgress()
  expect(summary.user.email).toBe("twodork@sprachy.com")

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
    email: "twodork@sprachy.com",
    password: "yuhyuhyuhyuh"
  })

  const summary2 = await asRando.api.getProgress()
  expect(summary2.user.email).toBe("twodork@sprachy.com")
})
