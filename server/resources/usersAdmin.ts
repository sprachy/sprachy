import { db } from '../db'
import type { AdminRequest } from '../routers'

export async function listUsers(req: AdminRequest) {
  return await db.users.listAll()
}