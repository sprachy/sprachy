import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'

const patchProfileForm = z.object({
  input: z.string(),
  type: z.string()
})
export const patch: RequestHandler = async ({ request, locals }) => {
  const { input, type } = patchProfileForm.parse(await request.json())

  var updatedUser = null
  if (type == "displayName") {
    updatedUser = await db.users.update(locals.session!.userId, { displayName: input })
  }
  else if (type == "username") {
    updatedUser = await db.users.update(locals.session!.userId, { username: input })
  }
  else if (type == "bio") {
    updatedUser = await db.users.update(locals.session!.userId, { bio: input })
  }
  else if (type == "pfp") {
    updatedUser = await db.users.update(locals.session!.userId, { pfp: input })
  }

  return {
    status: 200,
    body: updatedUser
  }
}