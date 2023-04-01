
import * as z from 'zod'
import { prisma } from '~/server/prisma'

const deleteExerciseSchema = z.object({
  taskId: z.string()
})

export default defineEventHandler(async (event) => {
  const { taskId } = deleteExerciseSchema.parse(event.context.params)

  await prisma.vqaTaskDef.delete({
    where: {
      id: taskId
    }
  })

  return { success: true }
})