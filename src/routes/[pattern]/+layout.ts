import { sprachdex } from "$lib/sprachdex"
import { error, type Load } from "@sveltejs/kit"

export const load: Load<{ pattern: string }> = async ({ params }) => {
  const pattern = sprachdex.patternsIncludingDrafts.find(
    (p) => p.slug === params.pattern
  )

  if (!pattern) {
    throw error(404, `No such pattern ${params.pattern}`)
  }

  return {
    pattern
  }
}