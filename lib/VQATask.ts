import type { TaskDefVQA } from "@prisma/client/edge"
import { tokenize } from "./tokenize"

export interface VQATask extends TaskDefVQA { }

/**
 * Runtime model for a VQA exercise that computes
 * additional properties from the raw data.
 */
export class VQATask {
  constructor(readonly def: TaskDefVQA) {
    Object.assign(this, def)
  }

  get questionTokens() {
    return tokenize(this.def.questionDe)
  }

  get questionLemmas() {
    // TODO lemmatization
    return this.questionTokens.filter(t => t.tag !== 'punctuation').map(t => t.value)
  }

  get imgUrl() {
    return `https://images.sprachy.com/${this.def.imageId}.webp`
  }

  get choices() {
    if (this.def.answerDe === 'ja') {
      return [
        { text: 'ja', correct: true },
        { text: 'nein', correct: false },
      ]
    } else {
      return [
        { text: 'ja', correct: false },
        { text: 'nein', correct: true },
      ]
    }
  }
}