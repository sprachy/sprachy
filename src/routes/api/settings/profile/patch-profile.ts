import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'
import { FaunaError } from '$lib/server/faunaUtil'

const patchProfileForm = z.object({
  displayName: z.optional(z.string()),
  username: z.optional(z.string()),
  bio: z.optional(z.string()),
  pfp: z.optional(z.string())
})
export const patch: RequestHandler = async ({ request, locals }) => {
  const changes = patchProfileForm.parse(await request.json())

  try {
    const updatedUser = await db.users.update(locals.session!.userId, changes)

    return {
      status: 200,
      body: updatedUser
    }
  } catch (err: any) {
    if (err instanceof FaunaError) {
      return {
        status: err.status,
        body: {
          code: err.code
        }
      }
    } else {
      throw err
    }
  }
}