import fs from 'fs/promises'
import { chunk, groupBy, keyBy } from 'lodash-es'
import { loadVQAs, saveVQAs } from '../server/dev/vqaProcessing'
import { titleCase } from '../lib/nlp'
import { glob } from 'glob'

/**
 * Deletes all VQA images that are not used by any VQA
 */
async function main() {
  const vqas = await loadVQAs()

  const imageIdsInUse = new Set(vqas.map(v => v.imageId))

  const imagePaths = await glob('public/val2014/*')
  const pathsToDelete: string[] = []

  for (const path of imagePaths) {
    // 'public/val2014/COCO_val2014_000000581929.jpg'

    const imageId = parseInt(path.match(/COCO_val2014_[0]+(\d+)\.jpg/)?.[1]!)
    if (!imageIdsInUse.has(imageId)) {
      pathsToDelete.push(path)
    }
  }

  console.log(`Deleting ${pathsToDelete.length} unused images`)
  for (const path of pathsToDelete) {
    await fs.unlink(path)
  }
}

main()