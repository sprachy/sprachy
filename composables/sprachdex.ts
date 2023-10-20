import type { QueryBuilderWhere } from "@nuxt/content/dist/runtime/types"
import { parsePattern, parsePatternNavigationItem, type Pattern, type PatternNavigationItem } from "~/lib/Pattern"
import characters from "~/lib/characters"
import type { Character } from "~/lib/characters"

class Sprachdex {
  characters = characters
  patternCache: Record<string, Pattern> = {}

  getCharacter(characterId: string): Character {
    return characters.find((c) => c.id === characterId) || characters[0]!
  }

  /**
   * Fetch pattern navigation items from the nuxt-content API.
   * Result includes metadata for each pattern but not the more
   * lengthy explanation, exercises or dialogue.
   */
  async fetchPatternIndex() {
    const items = await fetchContentNavigation()
    return items.map(parsePatternNavigationItem)
  }

  async fetchPatterns(query: QueryBuilderWhere) {
    const results = await queryContent().where(query).find()
    return results.map(parsePattern)
  }

  /**
   * Retrieve full data for a given pattern, including explanation,
   * dialogue and exercises.
   */
  async fetchPattern(query: Partial<PatternNavigationItem> & QueryBuilderWhere) {
    return parsePattern(await queryContent().where(query).findOne())
  }

  async fetchPatternById(patternId: string) {
    if (this.patternCache[patternId]) {
      return this.patternCache[patternId]
    } else {
      return this.fetchPattern({ id: patternId })
    }
  }

  async fetchPatternBySlug(patternSlug: string) {
    return this.fetchPattern({ _path: `/${patternSlug}` })
  }
}

export const sprachdex = new Sprachdex()