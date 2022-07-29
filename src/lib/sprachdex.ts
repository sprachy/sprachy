import { parsePattern, type ReadingLine } from "./Pattern"
import characters from "$lib/characters"
import type { Character } from "$lib/characters"
import patternDefs from "$lib/patterns"


class Sprachdex {
  characters = characters
  patternsIncludingDrafts = patternDefs.map((p) => parsePattern(p))
  publishedPatterns = this.patternsIncludingDrafts.filter((p) => !p.draft)
  draftPatterns = this.patternsIncludingDrafts.filter((p) => p.draft)

  /** Words used in any story */
  knownGermanWords: { [key: string]: true } = {}

  constructor() {
    for (const pattern of this.patternsIncludingDrafts) {
      for (const line of pattern.story) {
        if ('message' in line && line.message) {
          for (const word of line.message.split(/\s+/)) {
            this.knownGermanWords[word.toLowerCase().replace(/[[\]*".,!?_]/g, '')] = true
          }
        }
      }

      for (const line of pattern.exercises) {
        for (const word of line.message.split(/\s+/)) {
          this.knownGermanWords[word.toLowerCase().replace(/[[\]*".,!?_]/g, '')] = true
        }
      }
    }
  }

  getCharacter(characterId: string): Character {
    return characters.find((c) => c.id === characterId) || characters[0]!
  }
}

/**
 * Main interface for accessing sprachy content (patterns, exercises, characters, etc).
 *
 * Everything is currently compiled into the code bundle, so it's all
 * synchronously available. We may have to change this in the future
 * as the amount of content grows (in order to retain reasonable load times), 
 * but we don't need to worry about it for now.
 */
export const sprachdex = new Sprachdex()
