import type { RequestHandler } from "@sveltejs/kit"
import { db } from '$lib/server/db'
import { jsonResponse } from "$lib/server/util"

export const POST: RequestHandler = async ({ locals }) => {
  if (!locals.session)
    return jsonResponse(401, { error: "Not logged in" })

  await db.progress.resetFor(locals.session.userId)
  const [user, progressItems] = await Promise.all([
    db.users.expect(locals.session.userId),
    db.progress.listAllFor(locals.session.userId)
  ])
  return jsonResponse(200, {
    user, progressItems
  })
}