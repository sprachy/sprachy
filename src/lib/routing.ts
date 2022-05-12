import { pathToRegexp } from "path-to-regexp"
import { sprachdex } from "./sprachdex"

/**
 * Routes that can only be accessed when you're
 * logged in. We disable SSR for these and render
 * them only in the browser.
 */
const authedRoutes = [
  '/home',
  '/learn',
  '/practice',
  '/api(.*)',
  '/admin(.*)',
  '/settings',
  '/profile',
  '/subscribe'
]

for (const pattern of sprachdex.patternsIncludingDrafts) {
  authedRoutes.push(`/story/${pattern.slug}`)
}

export function isAuthedRoute(pathname: string): boolean {
  return authedRoutes.some(route => pathToRegexp(route).exec(pathname))
}