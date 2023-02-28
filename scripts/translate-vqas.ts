import fs from 'fs/promises'
import * as deepl from 'deepl-node'
import { chunk } from 'lodash-es'

async function getTranslatedVQAs() {
  try {
    return JSON.parse(await fs.readFile('data/translated-vqas.json', 'utf-8'))
  } catch (err) {
    return []
  }
}

async function main() {
  const translatedVQAs = await getTranslatedVQAs()
  const englishVQAs = JSON.parse(await fs.readFile('data/untranslated-vqas.json', 'utf-8'))


  const translator = new deepl.Translator(process.env.DEEPL_API_KEY as string)


  let amountTranslated = translatedVQAs.length
  const remainingUntranslated = englishVQAs.slice(amountTranslated)

  // TODO: chunk these by imageId instead and translate all text related to an image together
  // may improve contextual awareness
  for (const vqas of chunk(remainingUntranslated, 100)) {
    const texts = vqas.map(vqa => vqa.question + "\n" + vqa.answer)

    const results = await translator.translateText(
      texts, 'en', 'de'
    )

    for (let i = 0; i < results.length; i++) {
      const englishVQA = vqas[i]
      const [deQuestion, deAnswer] = results[i].text.split("\n")

      translatedVQAs.push({
        questionId: englishVQA.questionId,
        imageId: englishVQA.imageId,
        question: {
          en: englishVQA.question,
          de: deQuestion
        },
        answer: {
          en: englishVQA.answer,
          de: deAnswer
        }
      })
    }

    await fs.writeFile('data/translated-vqas.json', JSON.stringify(translatedVQAs, null, 2))

    amountTranslated += 100
    console.log(`${amountTranslated} / ${englishVQAs.length}`)
  }

}

main()