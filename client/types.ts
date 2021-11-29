import type { Exercise } from "../common/sprachdex"

export type ExerciseContext = {
  exercise: Exercise
  attempt: string
}