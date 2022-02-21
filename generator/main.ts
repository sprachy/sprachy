import * as fs from 'fs/promises'
import * as _ from 'lodash'

type Term = {
  word: string
  stem: string
  tags: {
    SUB?: true // Substantiv (noun)

    // Genders
    FEM?: true
    MAS?: true
    NEU?: true
  }
}


async function readPosDict() {
  const terms: Term[] = []
  const dict = await fs.readFile("./data/german-pos-dict.txt", 'utf-8')
  for (const line of dict.split(/\n+/)) {
    if (!line) break
    const [word, stem, tagline] = line.split(/\s+/)
    const tags: {[tag: string]: boolean} = {}
    for (const tag of tagline.split(':')) {
      tags[tag] = true
    }
    terms.push({word, stem, tags})
  }

  return terms
}

async function readGermanEnglishDict() {
  const dict = await fs.readFile("./data/de-en.txt", 'utf-8')
  const translations: {[de: string]: string} = {}

  for (const line of dict.split(/\n+/)) {
    if (line[0] === '#') continue
    if (!line) break
    const [deSide, enSide] = line.split(' :: ')
    const de = deSide.split(/\s+/)[0]
    const en = enSide.split(' | ')[0].split(/[\[\(;]/)[0].trim()
    translations[de] = en
  }

  return translations
}

async function main() {
  const terms = await readPosDict()
  const translations = await readGermanEnglishDict()

  const nouns = terms.filter(t => t.tags.SUB)

  let i = 0
  while (i < 10) {
    const randomNoun = _.sample(nouns)
    const en = translations[randomNoun.word]
    if (!en) continue

    const article = randomNoun.tags.FEM ? 'Die' : (randomNoun.tags.MAS ? 'Der' : 'Das')
    console.log(`${article} ${randomNoun.word} ist sehr lecker`)
    console.log(`The ${translations[randomNoun.word]} is very tasty`)
    console.log("")
    i += 1
  }
}

main()