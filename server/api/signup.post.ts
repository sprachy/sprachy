import * as z from 'zod'

import { sessions } from "~/server/sessions"
import http from "~/server/http"
import { env } from "~/server/env"
import bcrypt from 'bcryptjs'
import { prisma } from '~/server/prisma'

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

export type SignupSchema = z.infer<typeof signupForm>

export default defineEventHandler(async (event) => {
  const { email, password } = signupForm.parse(await readBody(event))

  const hashedPassword = bcrypt.hashSync(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  const sessionKey = await sessions.create(user.id)

  if (env.DISCORD_SIGNUP_WEBHOOK && !env.TESTING) {
    const params = {
      username: "SignUp",
      avatar_url: "",
      content: `Yuh new learny person **${email}** appeared! ❤️🐿️`,
    }

    http.post(env.DISCORD_SIGNUP_WEBHOOK, params)
  }

  sessions.setSessionCookie(event, sessionKey)

  return {
    summary: { user, progressItems: [] }
  }
})