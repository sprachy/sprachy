import { db } from "$lib/server/db"
import { jsonResponse } from "$lib/server/util"
import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler<{ username: string }> = async ({ params }) => {
  const user = await db.users.getByUsername(params.username)
  if (user) {
    return jsonResponse({
      profileUser: user
    })
  } else {
    return jsonResponse({
      error: "User not found"
    }, { status: 404 })
  }
}