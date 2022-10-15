import type { RequestHandler } from "@sveltejs/kit"
import { db } from "$lib/server/db"
import * as z from 'zod'
import { sessions } from "$lib/server/sessions"
import { jsonResponse } from "$lib/server/util"

export const GET: RequestHandler = async ({ locals }) => {
  const [user, progressItems] = await Promise.all([
    db.users.get(locals.session!.userId),
    db.progress.listAllFor(locals.session!.userId)
  ])

  if (!user) {
    // Invalid session, e.g. when the user was deleted
    await sessions.expire(locals.session!.sessionKey)
    return jsonResponse(401, {
      code: 'login required'
    })
  }

  return jsonResponse(200, {
    user, progressItems
  })
}

const progressReport = z.record(z.string(), z.number())
export const POST: RequestHandler = async ({ request, locals }) => {
  const experienceByPatternId = progressReport.parse(await request.json())

  const progressItems = await Promise.all(Object.keys(experienceByPatternId).map(patternId =>
    db.progress.gainExperience(locals.session!.userId, patternId, experienceByPatternId[patternId]!)
  ))

  return jsonResponse(200, progressItems)
}