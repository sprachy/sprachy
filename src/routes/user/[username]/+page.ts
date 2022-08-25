import { db } from "$lib/server/db"
import { error } from "@sveltejs/kit"

import type { PageServerLoad } from "./$types"
export const load: PageServerLoad = async ({ params }) => {
  const user = await db.users.getByUsername(params.username)
  if (user) {
    return { profileUser: user }
  } else {
    throw error(404, "User not found")
  }
}