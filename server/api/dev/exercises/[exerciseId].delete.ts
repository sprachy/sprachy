
import * as z from 'zod'
import { remove } from 'lodash-es'
import { loadVQAs, saveVQAs } from '~/server/dev/vqaProcessing'

const deleteExerciseSchema = z.object({
  exerciseId: z.coerce.number()
})

export default defineEventHandler(async (event) => {
  const { exerciseId } = deleteExerciseSchema.parse(event.context.params)

  const vqas = await loadVQAs()
  const removed = remove(vqas, (vqa) => vqa.id === exerciseId)
  console.log(`Removed ${removed.length} VQAs`)

  await saveVQAs(vqas)

  return { success: true }
})