import { sprachdex } from "$lib/sprachdex"
import { error, type Load } from "@sveltejs/kit"

export const load: Load<{ story: string }> = async ({ params }) => {
  const pattern = sprachdex.patternsIncludingDrafts.find(
    (p) => p.slug === params.story
  )

  if (!pattern) {
    throw error(404, `Pattern not found: ${params.story}`)
  }

  return { pattern }
}