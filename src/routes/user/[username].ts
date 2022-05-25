import { db } from "$lib/server/db"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler<{ username: string }> = async ({ params }) => {
  const user = await db.users.getByUsername(params.username)
  if (user) {
    return {
      body: {
        profileUser: user
      }
    }
  }
  else {
    return {
      status: 404
    }
  }
}