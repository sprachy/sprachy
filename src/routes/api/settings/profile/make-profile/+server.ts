import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'
import { FaunaError } from '$lib/server/faunaUtil'
// @ts-ignore
import slug from 'slug'
import { jsonResponse } from '$lib/server/util'

const patchProfileForm = z.object({
  displayName: z.string()
})
export const POST: RequestHandler = async ({ request, locals }) => {
  const { displayName } = patchProfileForm.parse(await request.json())

  let username = slug(displayName)

  while (true) {
    try {
      const updatedUser = await db.users.update(locals.session!.userId, { username, displayName })

      return jsonResponse(updatedUser)
    } catch (err: any) {
      if (err instanceof FaunaError && err.code === "instance not unique") {
        username += (Math.random() * 10).toString()[0]
      } else {
        throw err
      }
    }
  }
}