import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { v4 as uuidv4 } from "uuid"
import { time } from '$lib/time'
import { sendMail } from "$lib/server/email"
import { db } from '$lib/server/db'
import { kvs } from '$lib/server/kvs'
import { FRONTEND_BASE_URL } from '$lib/server/settings'

const resetPasswordForm = z.object({
  email: z.string()
})
export const post: RequestHandler = async ({ request }) => {
  const { email } = resetPasswordForm.parse(await request.json())

  const user = await db.users.getByEmail(email)
  if (user) {
    const token = uuidv4()
    await kvs.putJson(`reset_password_tokens:${token}`, { userId: user.id }, { expirationTtl: time.days(1) / 1000 })

    await sendMail({
      to: user.email,
      subject: "Reset your Sprachy password",
      text: `
Please click here to reset your password: ${FRONTEND_BASE_URL}/confirm-reset-password?token=${token}
      `
    })
  }

  return { status: 200 }
}