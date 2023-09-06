import fs from 'fs/promises'
import { prisma } from '../server/prisma'

async function main() {
  const tasks = await prisma.taskDefVQA.findMany()

  await fs.writeFile(
    'data/taskdefs.json',
    JSON.stringify(tasks, null, 2),
    'utf-8'
  )
}
main()