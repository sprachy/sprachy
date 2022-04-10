import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { v4 as uuidv4 } from "uuid"
import { time } from '$lib/time'
import { mailer } from "$lib/server/mailer"
import { db } from '$lib/server/db'
import { kvs } from '$lib/server/kvs'
import { env } from '$lib/server/env'

const resetPasswordForm = z.object({
  email: z.string()
})
export const post: RequestHandler = async ({ request, locals }) => {
  const { email } = resetPasswordForm.parse(await request.json())

  const user = await db.users.getByEmail(email)
  if (user) {
    const token = uuidv4()
    await kvs.putJson(`reset_password_tokens:${token}`, { userId: user.id }, { expirationTtl: time.days(1) / 1000 })

    await mailer.sendEmail({
      to: user.email,
      subject: "Reset your Sprachy password",
      text: `
Please click here to reset your password: ${env.FRONTEND_BASE_URL}/confirm-reset-password?token=${token}
      `
    })
  }

  return { status: 200 }
}