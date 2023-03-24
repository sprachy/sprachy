import fs from 'fs/promises'
import * as deepl from 'deepl-node'
import { groupBy } from 'lodash-es'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]

  const untranslatedVQAs = vqas.filter(v => !v.question.de || !v.answer.de)
  const translator = new deepl.Translator(process.env.DEEPL_API_KEY as string)

  const totalToTranslate = untranslatedVQAs.length
  console.log(`Translating ${totalToTranslate} untranslated VQAs`)
  let amountTranslated = 0


  // We translate questions about the same image together as part of
  // the one text. This is to help DeepL understand the context, since
  // it can't see the image itself
  const groups = groupBy(untranslatedVQAs, vqa => vqa.imageId)

  for (const vqas of Object.values(groups)) {
    const texts = vqas.map(vqa => vqa.question + "\n" + vqa.answer)

    const results = await translator.translateText(
      texts, 'en', 'de'
    )

    for (let i = 0; i < results.length; i++) {
      const vqa = vqas[i]
      const [deQuestion, deAnswer] = results[i].text.split("\n")

      vqa.question.de = deQuestion
      vqa.answer.de = deAnswer
    }

    await fs.writeFile('data/vqas.json', JSON.stringify(vqas, null, 2))

    amountTranslated += 100
    console.log(`${amountTranslated} / ${totalToTranslate}`)
  }

}

main()