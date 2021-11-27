import type { ServerResponse } from "worktop/response"
import * as z from 'zod'
import { Index, Login, Match } from "faunadb"

import type { User, ProgressSummary } from "../../common/api"
import type { BaseRequest } from "../middleware"
import { db } from "../db"
import { sessions } from "../sessions"
import { getFaunaError } from "../faunaUtil"

const signupForm = z.object({
  email: z.string().email(),
  password: z.string()
}).refine(d => d.password.length >= 12, {
  message: "Password must be at least length 12",
  path: ["password"]
})
export async function signup(req: BaseRequest, res: ServerResponse): Promise<ProgressSummary> {
  const { email, password } = signupForm.parse(await req.body())

  let user: User
  try {
    user = await db.users.create({ email, password, isAdmin: false })
  } catch (err: any) {
    const faunaErr = getFaunaError(err)
    if (faunaErr && faunaErr.code === "instance not unique") {
      // If the user already exists, try just signing in
      const res = await db.fauna.client.query(
        Login(
          Match(Index("users_by_email"), email),
          { password: password },
        )
      ) as FaunaLoginToken
      user = await db.users.get(res.instance.value.id)
    } else {
      throw err
    }
  }

  const progressItems = await db.progress.listAllFor(user.id)

  const sessionKey = await sessions.create(user.id)
  res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))
  return { user, progressItems }
}

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
export async function login(req: BaseRequest, res: ServerResponse): Promise<ProgressSummary> {
  const { email, password } = loginForm.parse(await req.body())

  const result = await db.fauna.client.query(
    Login(
      Match(Index("users_by_email"), email),
      { password: password },
    )
  ) as FaunaLoginToken

  // Note that we're not actually using fauna's access control here; we only ask
  // them to check the user's password, and then take it from there
  const user = await db.users.get(result.instance.value.id)
  const sessionKey = await sessions.create(user.id)
  res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))

  const progressItems = await db.progress.listAllFor(user.id)

  return { user, progressItems }
}

export async function logout(req: BaseRequest): Promise<void> {
  if (!req.session) return
  await sessions.expire(req.session.key)
}