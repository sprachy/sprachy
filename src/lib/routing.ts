import { pathToRegexp } from "path-to-regexp"
import { sprachdex } from "./sprachdex"

// Routes that don't require login
// These routes get SSR; every other route is gated by an auth redirect
// const publicRoutes = [
//   '/',
//   '/login',
//   '/signup',
//   '/reset-password',
//   '/reset-password/:token',
//   '/pattern/:slug',
//   '/faq'
// ]

const authedRoutes = [
  '/home',
  '/learn',
  '/practice',
  '/api(.*)',
  '/admin(.*)',
  '/settings'
]

for (const pattern of sprachdex.patternsIncludingDrafts) {
  authedRoutes.push(`/story/${pattern.slug}`)
}

export function isAuthedRoute(pathname: string): boolean {
  return authedRoutes.some(route => pathToRegexp(route).exec(pathname))
}