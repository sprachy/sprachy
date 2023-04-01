import type { vqaTaskDef } from "@prisma/client"
import { tokenize } from "./tokenize"

export interface VQATask extends vqaTaskDef { }

/**
 * Runtime model for a VQA exercise that computes
 * additional properties from the raw data.
 */
export class VQATask {
  constructor(readonly def: vqaTaskDef) {
    Object.assign(this, def)
  }

  get questionTokens() {
    return tokenize(this.def.questionDe)
  }

  get imgUrl() {
    return `/val2014/COCO_val2014_${this.def.imageId
      .toString()
      .padStart(12, "0")}.jpg`
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