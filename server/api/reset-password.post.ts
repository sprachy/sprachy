import * as z from 'zod'
import { prisma } from '~/server/prisma'
import { v4 as uuidv4 } from 'uuid'
import { kvs } from '~/server/kvs'
import { mailer } from '~/server/mailer'
import { time } from '~/lib/time'

const resetPasswordForm = z.object({
  email: z.string()
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordForm>

export default defineEventHandler(async (event) => {
  const { email } = resetPasswordForm.parse(await readBody(event))

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
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