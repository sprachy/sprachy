import type { RequestHandler } from "@sveltejs/kit"
import patterns from "$lib/patterns"

export const get: RequestHandler = async ({ params }) => {
  const pattern = patterns.find(p => p.slug === params.slug)

  if (!pattern) {
    return { status: 404 }
  }

  return {
    status: 200,
    body: {
      pattern: pattern
    }
  }
}