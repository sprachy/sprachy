import * as z from 'zod'
import { db } from '$lib/server/db'
import { kvs } from '$lib/server/kvs'
import type { RequestHandler } from '@sveltejs/kit'
import { jsonResponse } from '$lib/server/util'

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
    return jsonResponse({ success: true })
  } else {
    return jsonResponse(
      { message: "Invalid or expired token" },
      { status: 401 }
    )
  }
}