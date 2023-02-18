import * as z from 'zod'
import faunadb from 'faunadb'
const { Index, Login, Match } = faunadb.query

import { db } from "~/server/db"
import { FaunaError } from "~/server/faunaUtil"
import { sessions } from '~/server/sessions'

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
export default defineEventHandler(async (event) => {
  const { email, password } = loginForm.parse(await readBody(event))

  console.log(email, password)

  try {
    const result = await db.faunaQuery(
      Login(
        Match(Index("users_by_email"), email),
        { password: password },
      )
    ) as FaunaLoginToken

    console.log(result)

    // Note that we're not actually using fauna's access control here; we only ask
    // them to check the user's password, and then take it from there
    const user = await db.users.expect(result.instance.value.id)
    const sessionKey = await sessions.create(user.id)
    const progressItems = await db.progress.listAllFor(user.id)

    sessions.setSessionCookie(event, sessionKey)

    return {
      summary: { user, progressItems }
    }
  } catch (err) {
    if (err instanceof FaunaError && err.code === "authentication failed") {
      throw createError({
        statusCode: 401,
        statusMessage: "The password doesn't match the user"
      })
    } else {
      throw err
    }
  }
})