require('dotenv').config()

if (process.env.DATABASE_URL) {
  const { parse } = require('pg-connection-string')

  const { host, port, database, user, password } = parse(process.env.DATABASE_URL)

  // Set standard environment variables
  process.env.PGHOST = host
  process.env.PGPORT = port
  process.env.PGDATABASE = database
  process.env.PGUSER = user
  process.env.PGPASSWORD = password
}