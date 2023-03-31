import { tokenize } from "./tokenize"

export interface VQATask extends CompleteVQA { }

/**
 * Runtime model for a VQA exercise that computes
 * additional properties from the raw data.
 */
export class VQATask {
  constructor(readonly def: CompleteVQA) {
    Object.assign(this, def)
  }

  get questionTokens() {
    return tokenize(this.def.question.de)
  }

  get imgUrl() {
    return `/val2014/COCO_val2014_${this.def.imageId
      .toString()
      .padStart(12, "0")}.jpg`
  }
}