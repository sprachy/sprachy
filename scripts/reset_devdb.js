const dotenv = require('dotenv')
dotenv.config()
const Confirm = require('prompt-confirm');
const shell = require('shelljs')

async function resetdb() {
  const dbname = 'vokabon_dev'
  shell.exec(`fauna delete-database ${dbname}`)
  shell.exec(`fauna create-database ${dbname}`)
  shell.exec(`cat schema.fql | fauna shell ${dbname}`)
  shell.exec(`fauna create-key ${dbname}`)
}

async function main() {
  // const prompt = new Confirm(`Really reset the public schema at DATABASE_URL ${dburl}?`)
  // const answer = await prompt.run()
  // if (answer)
  resetdb()
}


main()
