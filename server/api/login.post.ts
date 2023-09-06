import * as z from 'zod'
import { sessions } from '~/server/sessions'
import { prisma } from '~/server/prisma'
import bcrypt from 'bcryptjs'
import { pick } from 'lodash-es'

const loginForm = z.object({
  email: z.string(),
  password: z.string()
})

export type LoginSchema = z.infer<typeof loginForm>

export default defineEventHandler(async (event) => {
  const { email, password } = loginForm.parse(await readBody(event))

  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
    include: {
      learnedLemmas: true
    }
  })

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: "The password doesn't match the user"
    })
  }

  const sessionKey = await sessions.create(user.id)
  sessions.setSessionCookie(event, sessionKey)

  return {
    summary: {
      user: pick(user, 'id', 'name', 'email'),
      learnedLemmas: user.learnedLemmas
    } as any as ProgressSummary
  }
})