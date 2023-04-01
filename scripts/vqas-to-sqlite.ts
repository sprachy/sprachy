import fs from 'fs/promises'
import { prisma } from '../server/prisma'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]

  for (const vqa of vqas) {
    const answer = vqa.choices?.find(c => c.correct)
    if (!vqa.question.de || !answer?.de)
      continue
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
}
main()