import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'

const changeNameForm = z.object({
  newName: z.optional(z.string())
})
export const patch: RequestHandler = async ({ request, locals }) => {
  const { newName } = changeNameForm.parse(await request.json())

  const updatedUser = await db.users.update(locals.session!.userId, { name: newName })

  return {
    status: 200,
    body: updatedUser
  }
}