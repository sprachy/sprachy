import * as z from 'zod'
import type { SessionRequest } from '../middleware'
import { db } from "../db"

const changeEmailForm = z.object({
  newEmail: z.string()
})
export async function changeEmail(req: SessionRequest): Promise<void> {
  const { newEmail } = changeEmailForm.parse(await req.body())
  await db.users.update(req.session.userId, { email: newEmail })
}