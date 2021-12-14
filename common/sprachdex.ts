import { Pattern } from "./Pattern"
import characters, { Character } from "../common/characters"
import patternDefs from "../patterns"

/**
 * Main interface for accessing sprachy content (patterns and exercises).
 *
 * Everything is currently compiled into the code bundle, so it's all
 * synchronously available.
 */
class Sprachdex {
  allPatterns = patternDefs.map((p) => new Pattern(p))

  getCharacter(characterId: string): Character {
    return characters.find((c) => c.id === characterId) || characters[0]!
  }
}

export const sprachdex = new Sprachdex()
