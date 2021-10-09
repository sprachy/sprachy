import type { Pattern, User } from "../../common/api"
import type { SessionRequest } from "../routers"
import { db } from "../db"

export async function getStatus(req: SessionRequest): Promise<{ user: User }> {
  return { user: await db.users.get(req.session.userId) }
}

export async function getNextLesson(req: SessionRequest): Promise<Pattern> {
  return (await db.patterns.listAll())[0]!
}