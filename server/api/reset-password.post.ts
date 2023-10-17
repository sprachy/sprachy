import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { mailer } from '~/server/mailer'
import { time } from '~/lib/time'
import { getKVStore } from '~/server/kvs'
import { getDatabase } from '~/db'

const resetPasswordForm = z.object({
  email: z.string()
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordForm>

export default defineEventHandler(async (event) => {
  const db = await getDatabase(event)
  const kvs = await getKVStore(event)
  const { email } = resetPasswordForm.parse(await readBody(event))

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  })

  if (user) {
    const token = uuidv4()
    await kvs.putJson(`reset_password_tokens:${token}`, { userId: user.id }, { expirationTtl: time.days(1) / 1000 })

    await mailer.sendEmail({
      to: user.email,
      subject: "Reset your Sprachy password",
      text: `
Please click here to reset your password: ${process.env.FRONTEND_BASE_URL}/confirm-reset-password?token=${token}
      `
    })
  }

  return { success: true }
})