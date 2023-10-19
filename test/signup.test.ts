import { test, expect } from 'vitest'
import { visitAsGuest } from './testenv'

test('signup', async () => {
  const asKel = await visitAsGuest()

  // Kel can sign up for a new account
  const res1 = await asKel.ofetch('/api/signup', {
    method: 'POST',
    body: {
      email: 'kel@example.com',
      password: 'orangejoetime',
      confirmPassword: 'orangejoetime'
    }
  })
  expect(res1.user.email).toBe('kel@example.com')
  expect(res1.hashedPassword).toBeUndefined()
})
