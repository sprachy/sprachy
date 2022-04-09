import { test, expect } from "vitest"
import { testenv } from './testenv'

test("srs progress updates", async () => {
  const { asRando } = await testenv()
  console.log(asRando)

  expect(1 + 1).toBe(2)
})
