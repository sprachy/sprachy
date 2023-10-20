import * as z from 'zod'
import { getSessionStore } from '~/server/sessions'
import bcrypt from 'bcryptjs'
import { pick } from 'lodash-es'
import { getDatabase } from '~/db'

const loginForm = z.object({
  email: z.string(),
  password: z.string()
})

export type LoginSchema = z.infer<typeof loginForm>

export default defineEventHandler(async (event) => {
  const { email, password } = loginForm.parse(await readBody(event))
  const db = await getDatabase(event)
  const sessions = await getSessionStore(event)

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  })

  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    throw createError({
      statusCode: 401,
      statusMessage: "The password doesn't match the user"
    })
  }

  const sessionId = await sessions.create(user.id)
  sessions.setSessionCookie(event, sessionId)

  return {
    summary: {
      user: pick(user, 'id', 'name', 'email'),
    } as any as ProgressSummary
  }
})