import * as z from 'zod'
import type { SessionRequest } from '../middleware'
import { db } from "../db"
import { sendMail } from "../email"

const changeEmailForm = z.object({
  newEmail: z.string()
})
export async function changeEmail(req: SessionRequest): Promise<void> {
  const { newEmail } = changeEmailForm.parse(await req.body())

  await sendMail({
    to: newEmail,
    subject: "Confirm your Sprachy email address",
    text: `
You requested to change your Sprachy email address to ${newEmail}.

Please click here to confirm: 
    `
  })

  await db.users.update(req.session.userId, { email: newEmail })
}