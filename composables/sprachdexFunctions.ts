import type { PatternId } from "~/lib/Pattern"
import * as z from 'zod'
import type { MarkdownRoot } from "@nuxt/content/dist/runtime/types"

// Nuxt-content doesn't validate the schema of the content files
// much, so we use Zod here to catch any malformed pattern data.

const patternNavigationItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  shortdesc: z.string()
})

export type PatternNavigationItem = z.infer<typeof patternNavigationItemSchema>

/**
 * Fetch pattern navigation items from the nuxt-content API.
 * Result includes metadata for each pattern but not the more
 * lengthy explanation, exercises or dialogue.
 */
export async function fetchPatternIndex() {
  const items = await fetchContentNavigation()
  const patterns: PatternNavigationItem[] = []

  for (const item of items) {
    const pattern = {
      ...item,
      slug: item._path.slice(1)
    }

    const result = patternNavigationItemSchema.safeParse(pattern)

    if (result.success) {
      patterns.push(result.data)
    } else {
      console.error(`Invalid pattern navigation item ${item.id}`, pattern, result.error.format())
      patterns.push(pattern as any)
    }
  }

  return patterns
}

const fullPatternDataSchema = patternNavigationItemSchema.extend({
  body: z.any()
})

export type FullPatternData = z.infer<typeof fullPatternDataSchema>

/**
 * Retrieve full data for a given pattern, including explanation,
 * dialogue and exercises.
 */
export async function fetchPatternById(patternId: PatternId) {
  const content = await queryContent().where({ id: patternId }).findOne()

  const result = fullPatternDataSchema.safeParse(content)
  if (result.success) {
    return result.data
  } else {
    console.error(`Invalid pattern data ${patternId}`, content, result.error.format())
    return content as any
  }

}
