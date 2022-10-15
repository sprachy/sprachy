import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import type { RequestHandler } from "@sveltejs/kit"
import { mailer } from "$lib/server/mailer"
import { kvs } from '$lib/server/kvs'
import { time } from '$lib/time'
import { db } from '$lib/server/db'
import { env } from '$lib/server/env'
import { jsonResponse } from '$lib/server/util'


const changeEmailForm = z.object({
  newEmail: z.string()
})
export const POST: RequestHandler = async ({ request, locals }) => {
  const { newEmail } = changeEmailForm.parse(await request.json())

  const existingUser = await db.users.getByEmail(newEmail)
  if (existingUser) {
    return jsonResponse(409, { error: "Email already in use" })
  }

  const token = uuidv4()
  await kvs.putJson(
    `email_confirm_tokens:${token}`,
    { userId: locals.session!.userId, email: newEmail },
    { expirationTtl: time.weeks(4) / 1000 }
  )

  await mailer.sendEmail({
    to: newEmail,
    subject: "Confirm your Sprachy email address",
    text: `
You requested to change your Sprachy email address to ${newEmail}.

Please click here to confirm: ${env.FRONTEND_BASE_URL}/settings?emailConfirmToken=${token}
    `
  })

  return jsonResponse(200, { success: true })
}