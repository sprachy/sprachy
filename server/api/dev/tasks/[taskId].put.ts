
import * as z from 'zod'
import { remove } from 'lodash-es'
import { loadVQAs, saveVQAs } from '~/server/dev/vqaProcessing'
import { prisma } from '~/server/prisma'

const putTaskSchema = z.object({
  id: z.string(),
  imageId: z.string(),
  questionEn: z.string(),
  questionDe: z.string(),
  answerEn: z.string(),
  answerDe: z.string()
})

export type PutTaskSchema = z.infer<typeof putTaskSchema>

export default defineEventHandler(async (event) => {
  const { taskId } = z.object({ taskId: z.string() }).parse(event.context.params)

  const newVQA = putTaskSchema.parse(await readBody(event))

  await prisma.taskDefVQA.upsert({
    where: { id: taskId },
    create: newVQA,
    update: newVQA
  })

  return { success: true }
})