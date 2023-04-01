import { prisma } from "../prisma"

export default defineEventHandler(async (event) => {
  const tasks = await prisma.taskDefVQA.findMany({
    where: {
      answerDe: {
        in: ['ja', 'nein']
      }
    }
  })
  return tasks
})