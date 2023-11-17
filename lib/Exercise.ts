import { omit } from "lodash-es"
import { Line, type LineDef } from "./Line"

export type ExerciseDef = (LineDef & { lines?: undefined }) | { lines: LineDef[] }

export interface Exercise extends LineDef { }

export class Exercise {
  lines: Line[] = []
  constructor(def: ExerciseDef) {
    Object.assign(this, omit(def, 'lines'))

    if (def.lines) {
      for (const line of def.lines) {
        this.lines.push(new Line(line))
      }
    } else {
      this.lines.push(new Line(def))
    }
  }

  get experience() {
    return 200
  }
}

export function parseExercise(def: ExerciseDef) {
  return new Exercise(def)
}