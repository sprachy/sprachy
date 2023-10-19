import { test, expect } from 'vitest'
import { visitAsGuest, signUpNewUser } from './testenv'

test('login', async () => {
  await Promise.all([
    signUpNewUser({
      email: 'sunny@example.com',
      password: 'manydreams'
    }),
    signUpNewUser({
      email: 'basil@example.com',
      password: 'sunnyiscute'
    })
  ])

  const asSunny = await visitAsGuest()

  // Sunny can't log in to Basil's account without
  // knowing the password
  const res1 = await asSunny.fetch('/api/login', {
    method: 'POST',
    body: {
      email: 'basil@example.com',
      password: 'sunflowerboy'
    }
  })
  expect(res1.status).toBe(401)
  expect(res1.headers.get('Set-Cookie')).toBeNull()

  // Sunny can log in to his own account
  const res2 = await asSunny.fetch('/api/login', {
    method: 'POST',
    body: {
      email: 'sunny@example.com',
      password: 'manydreams'
    }
  })
  expect(res2.status).toBe(200)
  expect(res2.headers.get('Set-Cookie')).toBeTruthy()


})
