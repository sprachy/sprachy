import fs from 'fs/promises'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]

  const readyVQAs = vqas.filter(v => v.question.de && v.cefr && v.choices) as CompleteVQA[]

  const exercises = readyVQAs.map(vqa => {
    return {
      id: vqa.id,
      imageId: vqa.imageId,
      cefr: vqa.cefr,
      question: vqa.question,
      choices: vqa.choices,
      tokens: vqa.tokens
    }
  })

  await fs.writeFile('assets/vqa-exercises.json', JSON.stringify(exercises, null, 2))
}

main()
