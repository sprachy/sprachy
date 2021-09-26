const dotenv = require('dotenv')
dotenv.config()
const { exec } = require('child-process-promise')
const Confirm = require('prompt-confirm');

async function resetdb(dburl) {
  // Drop and recreate public schema
  // This leaves the supabase "auth" schema unchanged
  console.log("Recreating schema")
  await exec(`echo "drop schema if exists public cascade; create schema public;" | psql ${dburl}`)

  // Add base supabase schema
  console.log("Applying initial supabase public schema")
  await exec(`psql ${dburl} -f sql/supabase.sql`)

  // Run migrations
  console.log("Running migrations")
  await exec(`DATABASE_URL=${dburl} npm run migrate up`)

  // Add policies
  console.log("Adding policies")
  await exec(`psql ${dburl} -f sql/policies.sql`)
}

async function main() {
  const dburl = process.env.DATABASE_URL
  const prompt = new Confirm(`Really reset the public schema at DATABASE_URL ${dburl}?`)
  const answer = await prompt.run()
  if (answer)
    resetdb(dburl)
}


main()