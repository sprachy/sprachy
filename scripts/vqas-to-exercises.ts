import fs from 'fs/promises'
import { takeWhile } from 'lodash-es'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]

  const readyVQAs = vqas.filter(v => v.question.de && v.cefr && v.choices) as CompleteVQA[]

  const exercises = readyVQAs.map(vqa => {

    const questionTokens: CompleteVQA['tokens'] = []
    for (const t of vqa.tokens) {
      questionTokens.push(t)
      if (t.token === '?') {
        break
      }
    }
    const answerTokens = vqa.tokens.slice(questionTokens.length + 1)

    return {
      id: vqa.id,
      imageId: vqa.imageId,
      cefr: vqa.cefr,
      question: vqa.question,
      choices: vqa.choices,
      questionTokens: questionTokens,
      answerTokens: answerTokens
    }
  })

  await fs.writeFile('assets/vqa-exercises.json', JSON.stringify(exercises, null, 2))
}

main()
