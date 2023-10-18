import { test, expect } from 'vitest'
import { asUser } from './testenv'

test('user', async () => {
  const res = await asUser.fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email: asUser.opts?.email,
      password: asUser.opts?.password
    })
  })
  console.log(res)
  // expect(numToWord(0)).toBe('Null')
})
