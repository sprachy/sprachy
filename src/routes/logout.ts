import type { RequestHandler } from "@sveltejs/kit"
import { sessions } from "$lib/server/sessions"


export const get: RequestHandler = async ({ locals }) => {
  if (locals.session) {
    await sessions.expire(locals.session.sessionKey)
  }
  return {
    status: 303,
    headers: {
      'location': '/'
    }
  }
}