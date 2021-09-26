import * as dotenv from 'dotenv'
dotenv.config()
import { exec } from 'child-process-promise'  

async function main() {
  const testdb = process.env.TEST_DATABASE_URL
  await exec(`psql ${testdb} -c "drop schema if exists public cascade;"`)
  await exec(`psql ${testdb} -c "create schema public;"`)
}

main()