import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'
import { Index, Login, Match } from "faunadb"
import { DISCORD_SIGNUP_WEBHOOK, FRONTEND_BASE_URL } from '$lib/server/settings'

import { db } from "$lib/server/db"
import { sessions } from "$lib/server/sessions"
import { FaunaError } from "$lib/server/faunaUtil"
import { ZodError } from "zod"
import { errorsByField } from "$lib/client/utils"

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
export const post: RequestHandler<void, { email: string, password: string, confirmPassword: string }> = async ({ request }) => {
  // @ts-ignore
  const data = Object.fromEntries(await request.formData())
  try {
    const { email, password } = signupForm.parse(data)

    const user = await db.users.create({ email, password, isAdmin: false })

    const progressItems = await db.progress.listAllFor(user.id)
    const sessionKey = await sessions.create(user.id)

    console.log(user)

    // if (DISCORD_SIGNUP_WEBHOOK) {
    //   const params = {
    //     username: "SignUp",
    //     avatar_url: "",
    //     content: `Yuh new learny person **${email}** appeared! ❤️🐿️`,
    //   }
    //   http.postJson(DISCORD_SIGNUP_WEBHOOK, params)
    // }

    return {
      status: 200,
      headers: {
        'set-cookie': sessions.asCookie(sessionKey)
      }
    }
    // return { summary: { user, progressItems } }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        status: 422,
        body: {
          ...data,
          errors: errorsByField(err.issues)
        }
      }
    } else if (err instanceof FaunaError && err.code === "instance not unique") {
      console.log(err)
      return {
        status: 409,
        body: {
          ...data,
          errors: {
            email: "This email is already in use"
          }
        }
      }
    } else {
      throw err
    }
  }
}