import * as z from 'zod'
import { prisma } from '~/server/prisma'
import { kvs } from '~/server/kvs'
import bcrypt from 'bcryptjs'

const confirmResetPasswordForm = z.object({
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

export type ConfirmResetPasswordSchema = z.infer<typeof confirmResetPasswordForm>

export default defineEventHandler(async (event) => {
  const { token, newPassword } = confirmResetPasswordForm.parse(await readBody(event))

  const json = await kvs.getJson<{ userId: string }>(`reset_password_tokens:${token}`)
  if (!json?.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: json.userId }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: bcrypt.hashSync(newPassword, 10)
    }
  })

  return { success: true }
})