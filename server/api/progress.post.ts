import * as z from 'zod'
import { prisma } from '../prisma'

const progressSchema = z.object({
  learnedLemmas: z.array(z.string())
})

export type ReportProgressSchema = z.infer<typeof progressSchema>

export default defineEventHandler(async (event) => {
  const { session } = event.context
  const { learnedLemmas } = progressSchema.parse(await readBody(event))

  await Promise.all(learnedLemmas.map(lemma => {
    prisma.learnedLemma.upsert({
      where: {
        lemma_userId: {
          lemma: lemma,
          userId: session.userId
        }
      },
      create: {
        userId: session.userId,
        lemma: lemma
      },
      update: {}
    })
  }))

  return { success: true }
})