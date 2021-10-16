import type { ServerRequest } from "worktop/request"
import { Collection, Create, Index, Login, Match } from "faunadb"
import * as z from 'zod'

import type { User } from "../../common/api"
import { db } from "../db"
import { sessions } from "../sessions"
import type { ServerResponse } from "worktop/response"
import type { BaseRequest } from "../routers"

const signupForm = z.object({
  email: z.string().email(),
  password: z.string()
}).refine(d => d.password.length >= 12, {
  message: "Password must be at least length 12",
  path: ["password"]
})
export async function signup(req: ServerRequest, res: ServerResponse): Promise<User> {
  const { email, password } = signupForm.parse(await req.body())

  const user = await db.users.create({ email, isAdmin: false }, password)

  const sessionKey = await sessions.create(user.id)
  res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))
  return user
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
export async function login(req: ServerRequest, res: ServerResponse): Promise<User> {
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
  return user
}

export async function logout(req: BaseRequest): Promise<void> {
  if (!req.session) return
  await sessions.expire(req.session.key)
}