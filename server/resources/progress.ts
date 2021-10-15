import type { Pattern, Progress, User } from "../../common/api"
import type { SessionRequest } from "../routers"
import { db } from "../db"
import faunadb, { Collection, Create, Documents, Expr, Get, Index, Login, Match, Ref, Update, Map, Lambda, Paginate, Var, Delete, If, Let, Exists, Now } from 'faunadb'
import * as z from 'zod'

export async function getStatus(req: SessionRequest): Promise<{ user: User }> {
  return {
    user: await db.users.get(req.session.userId)
  }
}

export async function getNextLesson(req: SessionRequest): Promise<Pattern | null> {
  return await db.patterns.nextPatternFor(req.session.userId)
}

const progressReport = z.object({
  patternId: z.string(),
  remembered: z.boolean()
})
export async function recordReview(req: SessionRequest): Promise<Progress> {
  const { patternId, remembered } = progressReport.parse(await req.body())
  return await db.progress.recordReview(req.session.userId, patternId, remembered)
}