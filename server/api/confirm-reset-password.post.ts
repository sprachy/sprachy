import * as z from 'zod'
import { getKVStore } from '~/server/kvs'
import bcrypt from 'bcryptjs'
import { getDatabase, schema } from '~/db'
import { eq } from 'drizzle-orm'

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
  const kvs = await getKVStore(event)
  const db = await getDatabase(event)
  const { token, newPassword } = confirmResetPasswordForm.parse(await readBody(event))

  const json = await kvs.getJson<{ userId: number }>(`reset_password_tokens:${token}`)
  if (!json?.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    })
  }

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, json.userId)
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    })
  }

  await db.update(schema.users)
    .set({ hashedPassword: bcrypt.hashSync(newPassword, 10) })
    .where(eq(schema.users.id, user.id))

  return { success: true }
})