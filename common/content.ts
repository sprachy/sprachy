import patterns from './patterns'

class ContentIndex {
  get allPatterns() {
    return patterns
  }
}

export const content = new ContentIndex()