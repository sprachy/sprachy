import { isAuthedRoute } from "$lib/routing"
import { redirect, type ServerLoad } from "@sveltejs/kit"

export const load: ServerLoad = async ({ url, locals }) => {
  const needsAuth = isAuthedRoute(url.pathname)
  const loggedIn = !!locals.session?.userId

  if (!loggedIn && needsAuth) {
    throw redirect(303, "/login?next=" + encodeURIComponent(url.pathname))
  } else {
    return {
      userId: locals.session?.userId
    }
  }
}