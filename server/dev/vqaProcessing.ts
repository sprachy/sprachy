import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const vqasPath = path.resolve('data/vqas.json')

export async function loadVQAs(): Promise<PartialVQA[]> {
  return JSON.parse(await fs.readFile(vqasPath, 'utf-8'))
}

export async function saveVQAs(vqas: PartialVQA[]): Promise<void> {
  await fs.writeFile(vqasPath, JSON.stringify(vqas, null, 2))
}