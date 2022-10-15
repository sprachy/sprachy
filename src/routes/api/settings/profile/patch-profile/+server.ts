import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'
import { FaunaError } from '$lib/server/faunaUtil'
import { jsonResponse } from '$lib/server/util'

const patchProfileForm = z.object({
  displayName: z.optional(z.string()),
  username: z.optional(z.string()),
  bio: z.optional(z.string()),
  pfp: z.optional(z.string())
})
export const PATCH: RequestHandler = async ({ request, locals }) => {
  const changes = patchProfileForm.parse(await request.json())

  try {
    const updatedUser = await db.users.update(locals.session!.userId, changes)

    return jsonResponse(200, updatedUser)
  } catch (err: any) {
    if (err instanceof FaunaError) {
      return jsonResponse(err.status, { error: err.message })
    } else {
      throw err
    }
  }
}