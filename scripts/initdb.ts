import * as schema from '../server/schema'
import { makeFaunaClient } from '../server/faunaUtil'

async function resetdb() {
  const fauna = makeFaunaClient()
  await fauna.query(schema.collections)
  await fauna.query(schema.indexes)
}

resetdb()