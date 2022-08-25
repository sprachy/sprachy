import type { RequestHandler } from "@sveltejs/kit"
import * as z from 'zod'
import { Index, Login, Match } from "faunadb"

import { db } from "$lib/server/db"
import { sessions } from "$lib/server/sessions"
import { FaunaError } from "$lib/server/faunaUtil"
import { jsonResponse } from "$lib/server/util"

type FaunaLoginToken = {
  ref: { value: { id: string } } // Token ref
  ts: number
  instance: { value: { id: string } } // User ref
  secret: string
}

const loginForm = z.object({
  email: z.string(),
  password: z.string()
})
export const POST: RequestHandler = async ({ request }) => {
  const { email, password } = loginForm.parse(await request.json())

  try {
    const result = await db.faunaQuery(
      Login(
        Match(Index("users_by_email"), email),
        { password: password },
      )
    ) as FaunaLoginToken


    // Note that we're not actually using fauna's access control here; we only ask
    // them to check the user's password, and then take it from there
    const user = await db.users.expect(result.instance.value.id)
    const sessionKey = await sessions.create(user.id)
    const progressItems = await db.progress.listAllFor(user.id)

    return jsonResponse({
      summary: { user, progressItems }
    }, {
      headers: {
        'set-cookie': sessions.asCookie(sessionKey),
      }
    })
  } catch (err) {
    if (err instanceof FaunaError && err.code === "authentication failed") {
      return jsonResponse(
        { message: "The password doesn't match the user" },
        { status: 401 }
      )
    } else {
      throw err
    }
  }
}