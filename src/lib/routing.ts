import { pathToRegexp } from "path-to-regexp"
import { sprachdex } from "./sprachdex"

/**
 * Routes that can only be accessed when you're
 * logged in.
 */
const authedRoutes = [
  '/learn',
  '/practice',
  '/(.*)/practice',
  '/api(.*)',
  '/admin(.*)',
  '/settings',
  '/subscribe',
  '/profile-settings',
  '/profile/setup'
]

for (const pattern of sprachdex.patternsIncludingDrafts) {
  authedRoutes.push(`/story/${pattern.slug}`)
}

export function isAuthedRoute(pathname: string): boolean {
  return authedRoutes.some(route => pathToRegexp(route).exec(pathname))
}