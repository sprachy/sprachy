import * as z from 'zod'

import http from "~/server/http"
import { env } from "~/server/env"
import bcrypt from 'bcryptjs'
import { getDatabase, schema } from '~/db'
import { getSessionStore } from '~/server/sessions'
import { omit } from 'lodash-es'
import { progressItemSchema, syncProgress } from './syncProgress.post'

const signupForm = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  progressItems: z.array(progressItemSchema)
}).refine(d => d.password.length >= 10, {
  message: "Password must be at least length 10",
  path: ["password"]
}).refine(d => d.password === d.confirmPassword, {
  message: "Confirm password must be identical to password",
  path: ["confirmPassword"]
})

export type SignupSchema = z.infer<typeof signupForm>

export default defineEventHandler(async (event) => {
  const sessions = await getSessionStore(event)
  const { email, password, progressItems } = signupForm.parse(await readBody(event))
  const db = await getDatabase(event)

  const hashedPassword = bcrypt.hashSync(password, 10)

  const user = (await db.insert(schema.users).values({
    email,
    hashedPassword,
    username: email.split("@")[0]! + Math.floor(Math.random() * 1000),
    displayName: email.split("@")[0]!
  }).returning())[0]!

  const sessionId = await sessions.create(user.id)

  if (env.DISCORD_SIGNUP_WEBHOOK && !env.TESTING) {
    const params = {
      username: "SignUp",
      avatar_url: "",
      content: `Yuh new learny person **${email}** appeared! ❤️🐿️`,
    }

    http.post(env.DISCORD_SIGNUP_WEBHOOK, params)
  }

  if (progressItems.length) {
    // Store any previous guest progress when the user signs up
    await syncProgress(db, user.id, progressItems)
  }

  sessions.setSessionCookie(event, sessionId)

  return {
    user: omit(user, 'hashedPassword')
  }
})