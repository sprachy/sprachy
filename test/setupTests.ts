// beforeEach(() => {
//     // Reset the db before each test
//     global.STORE.store = new Map()
// })

import { exec } from 'child-process-promise'  
import { dbenv } from './helpers'

jest.setTimeout(50000)
beforeAll(async () => {
  const connstr = "postgres://postgres:postgres@localhost:5434/postgres"

  // console.info("Clearing test database...")
  await exec(`psql ${connstr} -c "drop schema public cascade; create schema public;"`)

  // console.info("Installing supabase schema...")
  await exec(`psql ${connstr} -f sql/supabase.sql`)

  // console.info("Installing prisma schema...")
  await exec(`npx prisma db push`)

  // console.info("Applying policies.sql...")
  await exec(`psql ${connstr} -f sql/policies.sql`)
})

afterAll(async () => {
  const { prisma } = await dbenv()
  await prisma.$disconnect()
})