import { omit } from 'lodash-es'
import type { Line, LineDef } from './Line'
import { parseLine } from './Line'

export type DialogueDef = {
  title: string
  lines: LineDef[]
}

export interface Dialogue extends DialogueDef { }

export class Dialogue {
  lines: Line[]
  constructor(readonly def: DialogueDef) {
    Object.assign(this, omit(def, 'lines'))
    this.lines = def.lines.map(d => parseLine(d))
  }
}

export function parseDialogue(def: DialogueDef) {
  return new Dialogue(def)
}