import fs from 'fs/promises'

type VQA = {
  id: string,
  imageId: string,
  question: {
    en: string
  }
  answer: {
    en: string
  }
  alternativeAnswers?: string[]
}

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8'))

  await fs.writeFile('data/vqas.json', JSON.stringify(processedVQAs, null, 2))
}

main()