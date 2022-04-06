import type { RequestHandler } from "@sveltejs/kit"
import { db } from "$lib/server/db"

export const get: RequestHandler = async () => {
  const users = await db.users.listAll()
  return {
    status: 200,
    body: users
  }
}