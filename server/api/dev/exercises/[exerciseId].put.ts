
import * as z from 'zod'
import { remove } from 'lodash-es'
import { loadVQAs, saveVQAs } from '~/server/dev/vqaProcessing'

const putExerciseSchema = z.object({
  id: z.number(),
  imageId: z.number(),
  question: z.object({
    en: z.string(),
    de: z.string()
  }),
  choices: z.array(
    z.object({
      en: z.string(),
      de: z.string(),
      correct: z.boolean()
    })
  )
})

export type PutExerciseSchema = z.infer<typeof putExerciseSchema>

export default defineEventHandler(async (event) => {
  const { exerciseId } = z.object({ exerciseId: z.coerce.number() }).parse(event.context.params)

  const newVQA = putExerciseSchema.parse(await readBody(event))

  const vqas = await loadVQAs()
  const oldVQAIndex = vqas.findIndex(vqa => vqa.id === exerciseId)
  if (oldVQAIndex === -1) {
    vqas.push(newVQA)
  } else {
    vqas[oldVQAIndex] = newVQA
  }

  await saveVQAs(vqas)

  return { success: true }
})