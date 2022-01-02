import { testenv } from "./testenv"
import { db } from "../server/db"
import { testMailsSent } from "../server/email"

test("changing my email", async () => {
  testMailsSent.splice(0, testMailsSent.length)

  const { asUser } = await testenv()

  await asUser.api.changeEmail("cutewaffles@example.com")

  const summary = await asUser.api.getProgress()
  expect(summary.user.email).toBe("cutewaffles@example.com")

  expect(testMailsSent.length).toBe(1)
})
