import type { RequestHandler } from "@sveltejs/kit"
import { db } from "$lib/server/db"

export const get: RequestHandler = async ({ locals }) => {
  const [user, progressItems] = await Promise.all([
    db.users.expect(locals.session.userId),
    db.progress.listAllFor(locals.session.userId)
  ])
  return {
    status: 200,
    body: { user, progressItems }
  }
}