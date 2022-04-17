import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'

const settingsForm = z.object({
  wantsReminderEmails: z.optional(z.boolean()),
  enableSpeechSynthesis: z.optional(z.boolean())
})
export const patch: RequestHandler = async ({ request, locals }) => {
  const settingChanges = settingsForm.parse(await request.json())

  const updatedUser = await db.users.update(locals.session!.userId, settingChanges)

  return {
    status: 200,
    body: updatedUser
  }
}