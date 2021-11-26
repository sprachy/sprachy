import patterns from '../patterns'

class Sprachdex {
  get allPatterns() {
    return patterns
  }
}

export const sprachdex = new Sprachdex()