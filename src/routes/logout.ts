import type { RequestHandler } from "@sveltejs/kit"
import { sessions } from "$lib/server/sessions"


export const GET: RequestHandler = async ({ url, locals }) => {
  if (locals.session) {
    await sessions.expire(locals.session.sessionKey)
    locals.session = null
  }

  const next = url.searchParams.get("next")

  return {
    status: 303,
    headers: {
      'location': next || '/'
    }
  }
}