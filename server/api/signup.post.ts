import * as z from 'zod'

import { db } from "~/server/db"
import { sessions } from "~/server/sessions"
import { FaunaError } from "~/server/faunaUtil"
import http from "~/server/http"
import { env } from "~/server/env"

const signupForm = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string()
}).refine(d => d.password.length >= 10, {
  message: "Password must be at least length 10",
  path: ["password"]
}).refine(d => d.password === d.confirmPassword, {
  message: "Confirm password must be identical to password",
  path: ["confirmPassword"]
})
export default defineEventHandler(async (event) => {
  const { email, password } = signupForm.parse(await readBody(event))
  try {
    const user = await db.users.create({ email, password })
    const progressItems = await db.progress.listAllFor(user.id)
    const sessionKey = await sessions.create(user.id)

    if (env.DISCORD_SIGNUP_WEBHOOK && !env.TESTING) {
      const params = {
        username: "SignUp",
        avatar_url: "",
        content: `Yuh new learny person **${email}** appeared! ❤️🐿️`,
      }

      http.postJson(env.DISCORD_SIGNUP_WEBHOOK, params)
      // const req = http.postJson(env.DISCORD_SIGNUP_WEBHOOK, params)
      // platform.context.waitUntil(req)
    }

    sessions.setSessionCookie(event, sessionKey)

    return {
      summary: { user, progressItems }
    }

  } catch (err) {
    if (err instanceof FaunaError && err.code === "instance not unique") {
      throw createError({
        statusCode: 409,
        statusMessage: "Email is already in use",
      })
    } else {
      throw err
    }
  }
})