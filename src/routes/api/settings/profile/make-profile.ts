import * as z from 'zod'
import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'
import { FaunaError } from '$lib/server/faunaUtil'
// @ts-ignore
import slug from 'slug'

const patchProfileForm = z.object({
  displayName: z.string()
})
export const post: RequestHandler = async ({ request, locals }) => {
  const { displayName } = patchProfileForm.parse(await request.json())

  let username = slug(displayName)

  while (true) {
    try {
      const updatedUser = await db.users.update(locals.session!.userId, { username, displayName })

      return {
        status: 200,
        body: updatedUser
      }
    } catch (err: any) {
      if (err instanceof FaunaError && err.code === "instance not unique") {
        username += (Math.random() * 10).toString()[0]
      } else {
        throw err
      }
    }
  }
}