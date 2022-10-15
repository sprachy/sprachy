import type { RequestHandler } from "@sveltejs/kit"
import { db } from "$lib/server/db"
import { jsonResponse } from "$lib/server/util"

export const GET: RequestHandler = async () => {
  const users = await db.users.listAll()
  return jsonResponse(200, users)
}