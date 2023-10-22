import dotenv from "dotenv"
import axios from "axios"
import shell from "shelljs"
dotenv.config()

const hash = shell.exec("shasum dist/_worker.js", { silent: true }).stdout.split(" ")[0]
const branchName = shell.exec("git rev-parse --abbrev-ref HEAD", { silent: true }).stdout.trim()
const commitHash = shell.exec("git rev-parse HEAD", { silent: true }).stdout.trim()
const commitMessage = shell.exec("git show -s --format=%B HEAD", { silent: true }).stdout.trim()
const authorString = shell.exec("git show -s --format='%an <%ae>' HEAD", { silent: true }).stdout.trim()

axios.post(process.env.DISCORD_DEPLOY_WEBHOOK, {
  embeds: [{
    title: `Sprachy deployed ${branchName} => LIVE`,
    url: "https://sprachy.com",
    description:
      `\n**Latest commit:**` +
      `\n${authorString}` +
      `\n${commitMessage}` +
      `\n${commitHash}` +
      `\n\n**_worker.js hash:** ${hash}`,
    color: 0x2bae66
  }]
})