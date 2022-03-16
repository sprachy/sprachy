import { pathToRegexp } from "path-to-regexp"

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
  '/pattern/:slug/story'
]

export function isAuthedRoute(pathname: string): boolean {
  return authedRoutes.some(route => pathToRegexp(route).exec(pathname))
}