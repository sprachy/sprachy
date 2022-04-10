import * as schema from '../src/lib/server/schema'
import { makeFaunaClient } from '../src/lib/server/faunaUtil'

async function resetdb() {
  const fauna = makeFaunaClient()
  await fauna.query(schema.collections)
  await fauna.query(schema.indexes)
}

resetdb()