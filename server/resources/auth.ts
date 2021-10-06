import type { ServerRequest } from "worktop/request"
import { Collection, Create, Index, Login, Match } from "faunadb"
import * as z from 'zod'

import type { User } from "../../common/api"
import { fauna, FaunaDocument, flattenFauna } from "../db"
import { sessions } from "../sessions"
import type { ServerResponse } from "worktop/response"

const signupForm = z.object({
  email: z.string().email(),
  password: z.string()
}).refine(d => d.password.length >= 12, {
  message: "Password must be at least length 12",
  path: ["password"]
})
export async function signup(req: ServerRequest) {
  const { email, password } = signupForm.parse(await req.body())

  const result = await fauna.query(
    Create(
      Collection("users"),
      {
        credentials: { 
          password: password 
        },
        data: {
          email: email,
        }
      }
    )
  ) as FaunaDocument<User>

  return flattenFauna(result)
}

type FaunaLoginToken = {
  ref: { '@ref': { id: string }} // Token ref
  ts: number
  instance: { '@ref': { id: string }} // User ref
  secret: string
}

const loginForm = z.object({
  email: z.string(),
  password: z.string()
})
export async function login(req: ServerRequest, res: ServerResponse) {
  const { email, password } = loginForm.parse(await req.body())

  const result = await fauna.query(
    Login(
      Match(Index("users_by_email"), email),
      { password: password },
    )
  ) as FaunaLoginToken

  // Note that we're not actually using fauna's access control here; we only ask
  // them to check the user's password, and then take it from there
  const userId = result.instance['@ref'].id

  const sessionKey = await sessions.create(userId)
  res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))
  return { sessionKey }
}