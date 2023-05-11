import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import * as z from 'zod'
import { prisma } from '~/server/prisma'

const uploadFileSchema = z.object({
  id: z.string(),
  imageId: z.string(),
  questionEn: z.string(),
  questionDe: z.string(),
  answerEn: z.string(),
  answerDe: z.string()
})

export type UploadFileSchema = z.infer<typeof uploadFileSchema>

export default defineEventHandler(async (event) => {
  const { taskId } = z.object({ taskId: z.string() }).parse(event.context.params)

  const newVQA = uploadFileSchema.parse(await readBody(event))

  await prisma.taskDefVQA.upsert({
    where: { id: taskId },
    create: newVQA,
    update: newVQA
  })

  return { success: true }
})