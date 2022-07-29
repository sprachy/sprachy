import * as z from 'zod'
import { db } from '$lib/server/db'
import { kvs } from '$lib/server/kvs'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
  const token = url.searchParams.get("token")
  return {
    status: 200,
    body: {
      token: token
    }
  }
}

const confirmResetPassword = z.object({
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
export const POST: RequestHandler = async ({ request }) => {
  const { token, newPassword } = confirmResetPassword.parse(await request.json())

  const json = await kvs.getJson<{ userId: string }>(`reset_password_tokens:${token}`)
  const user = await db.users.get(json?.userId || "")
  if (user) {
    await db.users.changePassword(user.id, newPassword)
    return { status: 200 }
  } else {
    return {
      status: 401,
      body: {
        message: "Invalid or expired token"
      }
    }
  }
}
