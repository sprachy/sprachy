import fs from 'fs/promises'

async function readCommonalityDataset() {
  const lines = (await fs.readFile('data/dewiki-2022-08-29.txt', 'utf-8')).split('\n')
  const countByWord = new Map<string, number>()
  for (const line of lines) {
    const [word, countStr] = line.split(' ')
    const count = parseInt(countStr)
    if (!isNaN(count)) {
      countByWord.set(word, count)
    }
  }
  return countByWord
}

function calculateTextCommonalityScore(text: string, countByWord: Map<string, number>) {
  const words = text.split(/[.?!,;: ]+/)
  const scoreSum = words.reduce((sum, word) => sum + (countByWord.get(word.toLowerCase()) ?? 0), 0)
  const averageScore = scoreSum / words.length
  return averageScore
}

async function main() {
  const exercises = JSON.parse(await fs.readFile('data/vqa-exercises-de.json', 'utf-8'))
  const countByWord = await readCommonalityDataset()

  for (const ex of exercises) {
    const score = (calculateTextCommonalityScore(ex.question.de, countByWord) + calculateTextCommonalityScore(ex.answer.de, countByWord)) / 2
    ex.commonalityScore = score
  }

  exercises.sort((a, b) => b.commonalityScore - a.commonalityScore)

  await fs.writeFile('data/vqa-exercises-de-sorted.json', JSON.stringify(exercises, null, 2))
}

main()