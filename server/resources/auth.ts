import type { ServerResponse } from "worktop/response"
import * as z from 'zod'
import { Index, Login, Match } from "faunadb"

import type { LoginResult, SignupResult } from "../../common/api"
import { APIRequest, HTTPError } from "../middleware"
import { db } from "../db"
import { sessions } from "../sessions"
import { FaunaError } from "../faunaUtil"
import { DISCORD_SIGNUP_WEBHOOK, FRONTEND_BASE_URL } from '../settings'
import http from '../http'
import { sendMail } from "../email"
import { v4 as uuidv4 } from "uuid"
import { kvs } from "../kvs"
import { time } from "../../common/time"

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
export async function signup(req: APIRequest, res: ServerResponse): Promise<SignupResult> {
  const { email, password } = signupForm.parse(await req.body())

  try {
    const user = await db.users.create({ email, password, isAdmin: false })

    const progressItems = await db.progress.listAllFor(user.id)
    const sessionKey = await sessions.create(user.id)
    res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))


    const params = {
      username: "SignUp",
      avatar_url: "",
      content: `Yuh new learny person **${email}** appeared! ❤️🐿️`,
    }
    http.postJson(DISCORD_SIGNUP_WEBHOOK, params)

    return { status: 200, summary: { user, progressItems } }
  } catch (err) {
    if (err instanceof FaunaError && err.code === "instance not unique") {
      return { status: 409, code: "user already exists" }
    } else {
      throw err
    }
  }
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
export async function login(req: APIRequest, res: ServerResponse): Promise<LoginResult> {
  const { email, password } = loginForm.parse(await req.body())

  const userExists = await db.users.getByEmail(email) !== null
  if (!userExists) {
    return { status: 401, code: "new user" }
  }

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
    res.headers.set('Set-Cookie', sessions.asCookie(sessionKey))

    const progressItems = await db.progress.listAllFor(user.id)
    return { status: 200, summary: { user, progressItems } }
  } catch (err) {
    if (err instanceof FaunaError && err.code === "authentication failed") {
      return { status: 401, code: "wrong password" }
    } else {
      throw err
    }
  }
}

export async function logout(req: APIRequest): Promise<void> {
  if (!req.session) return
  await sessions.expire(req.session.key)
}


const resetPasswordForm = z.object({
  email: z.string()
})
export async function sendPasswordResetEmail(req: APIRequest): Promise<void> {
  const { email } = resetPasswordForm.parse(await req.body())

  const user = await db.users.getByEmail(email)
  if (user) {
    const token = uuidv4()
    await kvs.putJson(`reset_password_tokens:${token}`, { userId: user.id }, { expirationTtl: time.days(1) / 1000 })

    await sendMail({
      to: user.email,
      subject: "Reset your Sprachy password",
      text: `
Please click here to reset your password: ${FRONTEND_BASE_URL}/reset-password/${token}
      `
    })
  }
}

const confirmPasswordResetForm = z.object({
  token: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string()
}).refine(d => d.newPassword.length >= 10, {
  message: "Password must be at least length 10",
  path: ["newPassword"]
}).refine(d => d.newPassword === d.confirmPassword, {
  message: "Confirm password must be identical to password",
  path: ["confirmPassword"]
})
export async function confirmPasswordReset(req: APIRequest): Promise<void> {
  const { token, newPassword } = confirmPasswordResetForm.parse(await req.body())

  const json = await kvs.getJson<{ userId: string }>(`reset_password_tokens:${token}`)
  const user = await db.users.get(json?.userId || "")
  if (user) {
    await db.users.changePassword(user.id, newPassword)
  } else {
    throw new HTTPError(401, "Invalid or expired token")
  }
}
