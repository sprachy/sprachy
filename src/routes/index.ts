import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async ({ params, locals }) => {
  if (locals.session) {
    return {
      status: 303,
      headers: {
        location: `/home`
      }
    }
  } else {
    return {
      status: 200
    }
  }
}