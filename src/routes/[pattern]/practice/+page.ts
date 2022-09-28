import { sprachdex } from "$lib/sprachdex"
import type { PageLoad } from "./$types"

export const ssr = false

export const load: PageLoad = async ({ params }) => {
  const pattern = sprachdex.patternsIncludingDrafts.find(
    (p) => p.slug === params.pattern
  )

  if (!pattern) {
    return { status: 404 }
  }

  return {
    patternId: pattern.id,
  }
}