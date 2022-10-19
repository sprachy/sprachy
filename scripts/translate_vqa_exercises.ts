import fs from 'fs/promises'
import axios from 'axios'


async function main() {
  const exercises = JSON.parse(await fs.readFile('data/vqa-exercises-en.json', 'utf-8')).slice(0, 100)

  let i = 0
  for (const ex of exercises) {
    const res = await axios.post(`http://localhost:5999/api/translate`, {
      from: "en",
      to: "de",
      texts: [ex.question, ...ex.choices]
    })
    const { translations } = res.data
    ex.question = {
      en: ex.question,
      de: translations[0]
    }

    for (let i = 0; i < ex.choices.length; i++) {
      ex.choices[i] = {
        en: ex.choices[i],
        de: translations[1 + i]
      }
    }

    ex.answer = {
      en: ex.answer,
      de: ex.choices.find(c => c.en === ex.answer).de
    }

    i += 1
    if (i % 10 === 0) {
      console.log(`${i} / ${exercises.length}`)
    }
  }

  await fs.writeFile('data/vqa-exercises-de.json', JSON.stringify(exercises, null, 2))
}

main()