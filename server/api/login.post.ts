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


import { drizzle } from 'drizzle-orm/better-sqlite3'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database('sqlite.db')
const db: BetterSQLite3Database = drizzle(sqlite)

export default defineEventHandler(async (event) => {
  const { email, password } = loginForm.parse(await readBody(event))

  const user = await db.user.findUnique({
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