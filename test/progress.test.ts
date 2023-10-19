import { test, expect } from 'vitest'
import { signUpNewUser } from './testenv'

test('syncProgress', async () => {
  const asUser = await signUpNewUser()

  // Syncing a new user with no progress-- should get empty array back
  const res1 = await asUser.ofetch('/api/syncProgress', {
    method: 'POST'
  })

  expect(res1.progressItems).toEqual([])


  // Send some initial progress; should get the input back
  const progressItems = [
    {
      patternId: 'der-die-das',
      initiallyLearnedAt: Date.now(),
      lastExperienceGainAt: Date.now(),
      experience: 100
    }
  ]
  const res2 = await asUser.ofetch('/api/syncProgress', {
    method: 'POST',
    body: {
      progressItems
    }
  })

  expect(res2.progressItems).toEqual(progressItems)

  // Now sync with nothing again, should get the previous ones
  const res3 = await asUser.ofetch('/api/syncProgress', {
    method: 'POST'
  })

  expect(res3.progressItems).toEqual(progressItems)

  // Sync with a lower-experience item; result should be unchanged
  const res4 = await asUser.ofetch('/api/syncProgress', {
    method: 'POST',
    body: {
      progressItems: [{
        patternId: 'der-die-das',
        initiallyLearnedAt: Date.now() - 100,
        lastExperienceGainAt: Date.now() - 100,
        experience: 10
      }]
    }
  })

  expect(res4.progressItems).toEqual(progressItems)

  // Sync with a new item, should get both back
  const progressItems3 = [
    ...progressItems,
    {
      patternId: 'das-chen',
      initiallyLearnedAt: Date.now(),
      lastExperienceGainAt: Date.now(),
      experience: 200
    }
  ]

  const res5 = await asUser.ofetch('/api/syncProgress', {
    method: 'POST',
    body: {
      progressItems: progressItems3
    }
  })

  expect(res5.progressItems).toEqual(progressItems3)
})
