import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'

const settingsForm = z.object({
  wantsReminderEmails: z.boolean()
})
export const patch: RequestHandler = async ({ request, locals }) => {
  const { wantsReminderEmails } = settingsForm.parse(await request.json())

  const newUser = await db.users.update(locals.session!.userId, { wantsReminderEmails })

  return {
    status: 200,
    body: newUser
  }
}