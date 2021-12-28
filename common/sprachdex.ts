import { parsePattern } from "./Pattern"
import characters, { Character } from "../common/characters"
import patternDefs from "../patterns"

/**
 * Main interface for accessing sprachy content (patterns, exercises, characters, etc).
 *
 * Everything is currently compiled into the code bundle, so it's all
 * synchronously available. We may have to change this in the future
 * as the amount of content grows (in order to retain reasonable load times), 
 * but we don't need to worry about it for now.
 */
class Sprachdex {
  allPatterns = patternDefs.map((p) => parsePattern(p))

  getCharacter(characterId: string): Character {
    return characters.find((c) => c.id === characterId) || characters[0]!
  }
}

export const sprachdex = new Sprachdex()
