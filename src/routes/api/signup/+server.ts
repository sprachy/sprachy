import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'

import { db } from "$lib/server/db"
import { sessions } from "$lib/server/sessions"
import { FaunaError } from "$lib/server/faunaUtil"
import http from "$lib/server/http"
import { env } from "$lib/server/env"
import { jsonResponse } from "$lib/server/util"

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
export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = signupForm.parse(await request.json())
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

    return jsonResponse(200, {
      summary: { user, progressItems }
    }, {
      headers: {
        'set-cookie': sessions.asCookie(sessionKey)
      },
    })
  } catch (err) {
    if (err instanceof FaunaError && err.code === "instance not unique") {
      return jsonResponse(409,
        { message: "Email is already in use" },
      )
    } else {
      throw err
    }
  }
}