import type { Pattern } from "../../common/api"
import type { SessionRequest } from "../routers"
import { db } from "../db"

export async function getNextLesson(req: SessionRequest): Promise<Pattern> {
  return (await db.patterns.listAll())[0]!
}