import fs from 'fs/promises'
import { prisma } from '../server/prisma'
import { saveVQAs } from '../server/dev/vqaProcessing'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]

  const takenVQAIds = new Set<number>()

  for (const vqa of vqas) {
    const answer = vqa.choices?.find(c => c.correct)
    if (!vqa.question.de || !answer?.de)
      continue

    takenVQAIds.add(vqa.id)
    await prisma.taskDefVQA.create({
      data: {
        id: vqa.id.toString(),
        imageId: vqa.imageId.toString(),
        questionEn: vqa.question.en,
        questionDe: vqa.question.de,
        answerEn: answer.en,
        answerDe: answer.de
      }
    })
  }

  saveVQAs(vqas.filter(vqa => !takenVQAIds.has(vqa.id)))
}
main()