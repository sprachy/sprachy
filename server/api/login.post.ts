import * as z from 'zod'
import { getSessionStore } from '~/server/sessions'
import bcrypt from 'bcryptjs'
import { omit, pick } from 'lodash-es'
import { getDatabase } from '~/db'
import { syncProgress } from './syncProgress.post'

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
  progressItems: z.array(z.object({
    patternId: z.string(),
    initiallyLearnedAt: z.number(),
    lastExperienceGainAt: z.number(),
    experience: z.number()
  }))
})

export type LoginSchema = z.infer<typeof loginSchema>

export default defineEventHandler(async (event) => {
  const { email, password, progressItems } = loginSchema.parse(await readBody(event))
  const db = await getDatabase(event)
  const sessions = await getSessionStore(event)

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
    columns: {
      id: true,
      displayName: true,
      username: true,
      email: true,
      hashedPassword: true
    },
    with: {
      progressItems: true
    }
  })

  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    throw createError({
      statusCode: 401,
      statusMessage: "The password doesn't match the user"
    })
  }

  if (progressItems.length) {
    // Store any previous guest progress when the user logs in
    await syncProgress(db, user.id, progressItems)
  }

  const sessionId = await sessions.create(user.id)
  sessions.setSessionCookie(event, sessionId)

  return {
    user: omit(user, 'hashedPassword', 'progressItems'),
    progressItems: user.progressItems
  }
})