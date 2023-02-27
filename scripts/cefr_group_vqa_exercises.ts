import fs from 'fs/promises'

function tokenize(text: string): string[] {
  return text.replace(/[^\w\s]+/g, '').toLowerCase().split(' ')
}

async function readGoetheWordlist() {
  const lines = (await fs.readFile('data/Goethe Institute A1 Wordlist.txt', 'utf-8')).split('\n')
  const tokens = new Set()
  for (const line of lines) {
    if (!line.length) continue
    const deWord = line.split('\t')[1]
    for (const token of tokenize(deWord)) {
      tokens.add(token)
    }
  }
  return tokens
}

function calculateTextCommonalityScore(text: string, countByWord: Map<string, number>) {
  const words = text.split(/[.?!,;: ]+/)
  const scoreSum = words.reduce((sum, word) => sum + (countByWord.get(word.toLowerCase()) ?? 0), 0)
  const averageScore = scoreSum / words.length
  return averageScore
}

async function main() {
  const wordlist = await readGoetheWordlist()


  // console.log(wordlist)

  const exercises = JSON.parse(await fs.readFile('data/vqa-exercises-de.json', 'utf-8'))

  let count = 0
  for (const ex of exercises) {
    const tokens = tokenize(ex.question.de)
    if (tokens.every(token => wordlist.has(token))) {
      count++
    }

    for (const token of tokens) {
      if (!wordlist.has(token)) {
        console.log(token)
      }
    }
  }

  console.log(`${count} / ${exercises.length}`)

  // const countByWord = await readCommonalityDataset()

  // for (const ex of exercises) {
  //   const score = (calculateTextCommonalityScore(ex.question.de, countByWord) + calculateTextCommonalityScore(ex.answer.de, countByWord)) / 2
  //   ex.commonalityScore = score
  // }

  // exercises.sort((a, b) => b.commonalityScore - a.commonalityScore)

  // await fs.writeFile('data/vqa-exercises-de-cefr.json', JSON.stringify(exercises, null, 2))
}

main()