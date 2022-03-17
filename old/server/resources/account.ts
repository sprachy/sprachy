import * as z from 'zod'
import { HTTPError, SessionRequest } from '../middleware'
import { db } from "../db"
import { sendMail } from "../email"
import { FRONTEND_BASE_URL } from '../settings'
import { v4 as uuidv4 } from 'uuid'
import { kvs } from '$lib/server/kvs'
import { time } from '$lib/time'


const changeEmailForm = z.object({
  newEmail: z.string()
})
export async function changeEmail(req: SessionRequest): Promise<void> {
  const { newEmail } = changeEmailForm.parse(await req.body())
  const token = uuidv4()
  await kvs.putJson(`email_confirm_tokens:${token}`, { userId: req.session.userId, email: newEmail }, { expirationTtl: time.weeks(4) / 1000 })

  await sendMail({
    to: newEmail,
    subject: "Confirm your Sprachy email address",
    text: `
You requested to change your Sprachy email address to ${newEmail}.

Please click here to confirm: ${FRONTEND_BASE_URL}/settings?emailConfirmToken=${token}
    `
  })
}

const confirmEmailChangeForm = z.object({
  token: z.string()
})
export async function confirmEmailChange(req: SessionRequest): Promise<{ newEmail: string }> {
  const { token } = confirmEmailChangeForm.parse(await req.body())

  const json = await kvs.getJson<{ userId: string, email: string }>(`email_confirm_tokens:${token}`)
  if (json && json.userId === req.session.userId) {
    await db.users.update(req.session.userId, { email: json.email })
    return { newEmail: json.email }
  } else {
    throw new HTTPError(400, "Invalid or expired token")
  }
}