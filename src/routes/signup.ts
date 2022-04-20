import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'

import { db } from "$lib/server/db"
import { sessions } from "$lib/server/sessions"
import { FaunaError } from "$lib/server/faunaUtil"
import http from "$lib/server/http"
import { env } from "$lib/server/env"

const signupForm = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  wantsReminderEmails: z.boolean()
}).refine(d => d.password.length >= 10, {
  message: "Password must be at least length 10",
  path: ["password"]
}).refine(d => d.password === d.confirmPassword, {
  message: "Confirm password must be identical to password",
  path: ["confirmPassword"]
})
export const post: RequestHandler = async ({ request }) => {
  const { email, password, wantsReminderEmails } = signupForm.parse(await request.json())
  try {
    const user = await db.users.create({ email, password, wantsReminderEmails })
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

    return {
      status: 200,
      headers: {
        'set-cookie': sessions.asCookie(sessionKey)
      },
      body: {
        summary: { user, progressItems }
      }
    }
  } catch (err) {
    if (err instanceof FaunaError && err.code === "instance not unique") {
      return {
        status: 409,
        body: {
          message: "Email is already in use",
        }
      }
    } else {
      throw err
    }
  }
}