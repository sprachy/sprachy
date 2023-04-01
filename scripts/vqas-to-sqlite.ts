import fs from 'fs/promises'
import { remove } from 'lodash-es'
import { prisma } from '../server/prisma'

async function main() {
  const vqas = JSON.parse(await fs.readFile('data/vqas.json', 'utf-8')) as PartialVQA[]

}
main()