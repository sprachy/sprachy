import * as z from 'zod'

const progressSchema = z.object({
  experienceByPatternId: z.record(z.string(), z.number())
})

export type ReportProgressSchema = z.infer<typeof progressSchema>

export default defineEventHandler(async (event) => {
  // const { session } = event.context
  // const { experienceByPatternId } = progressSchema.parse(await readBody(event))

  // await Promise.all(Object.entries(experienceByPatternId).map(([patternId, experience]) => {
  //   prisma.progressItem.upsert({
  //     where: {
  //       userId_patternId: {
  //         userId: session.userId,
  //         patternId: patternId
  //       }
  //     },
  //     create: {
  //       userId: session.userId,
  //       patternId: patternId,
  //       experience: experience,
  //       initiallyLearnedAt: Date.now(),
  //       lastExperienceGainAt: Date.now()
  //     },
  //     update: {
  //       experience: {
  //         increment: experience
  //       },
  //       lastExperienceGainAt: Date.now()
  //     }
  //   })
  // }))

  return { success: true }
})