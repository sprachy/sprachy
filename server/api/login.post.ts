import * as z from 'zod'
import { sessions } from '~/server/sessions'
import { prisma } from '~/server/prisma'
import bcrypt from 'bcryptjs'
import { omit } from 'lodash-es'
import type { ProgressSummary } from '~/lib/types'

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
      progressItems: true
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
      user: omit(user, 'password', 'progressItems'),
      progressItems: user.progressItems
    } as any as ProgressSummary
  }
})