import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'

const patchProfileForm = z.object({
  newName: z.string(),
  newBio: z.string()
})
export const patch: RequestHandler = async ({ request, locals }) => {
  const { newName, newBio } = patchProfileForm.parse(await request.json())

  var updatedUser = null
  if (newName != "") {
    updatedUser = await db.users.update(locals.session!.userId, { name: newName })
  }
  else if (newBio != "") {
    updatedUser = await db.users.update(locals.session!.userId, { bio: newBio })
  }

  return {
    status: 200,
    body: updatedUser
  }
}