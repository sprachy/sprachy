import shell from 'shelljs'
import fs from 'fs'

export async function resetdb() {
  const dbname = 'vokabon_dev'
  shell.exec(`fauna delete-database ${dbname}`)
  shell.exec(`fauna create-database ${dbname}`)

  // Fauna cli is dumb and doesn't know how to like, split queries, so we do it with line breaks
  const fql = fs.readFileSync(`./schema.fql`, 'utf-8')
  const queries = fql.split("\n\n")
  for (const query of queries) {
    fs.writeFileSync(`/tmp/query.fql`, query)
    shell.exec(`fauna eval vokabon_dev --file=/tmp/query.fql`)
  }

  const output = shell.exec(`fauna create-key ${dbname} admin`)
  const secret = output.match(/secret: (\S+)/)[1]
  shell.exec(`sed -i '' -e 's/FAUNA_ADMIN_KEY=.*/FAUNA_ADMIN_KEY=${secret}/g' .env`)
}

  // const prompt = new Confirm(`Really reset the public schema at DATABASE_URL ${dburl}?`)
  // const answer = await prompt.run()
  // if (answer)
