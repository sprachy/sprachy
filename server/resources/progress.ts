import type { Progress, ProgressSummary, Review, User } from "../../common/api"
import type { SessionRequest } from "../middleware"
import { db } from "../db"
import faunadb, { Collection, Create, Documents, Expr, Get, Index, Login, Match, Ref, Update, Map, Lambda, Paginate, Var, Delete, If, Let, Exists, Now } from 'faunadb'
import * as z from 'zod'

export async function getSummary(req: SessionRequest): Promise<ProgressSummary> {
  const [user, progressItems] = await Promise.all([
    db.users.get(req.session.userId),
    db.progress.listAllFor(req.session.userId)
  ])
  return { user, progressItems }
}

const progressReport = z.object({
  patternId: z.string(),
  remembered: z.boolean()
})
export async function recordReview(req: SessionRequest): Promise<Progress | null> {
  const { patternId, remembered } = progressReport.parse(await req.body())
  return await db.progress.recordReview(req.session.userId, patternId, remembered)
}