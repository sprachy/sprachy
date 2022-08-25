import { sprachdex } from "$lib/sprachdex"
import type { Load } from "@sveltejs/kit"

export const load: Load<{ pattern: string }> = async ({ params }) => {
  const pattern = sprachdex.patternsIncludingDrafts.find(
    (p) => p.slug === params.pattern
  )

  if (!pattern) {
    return { status: 404 }
  }

  return {
    status: 200,
    props: {
      pattern: pattern,
    },
  }
}