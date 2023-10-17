import repl from 'repl'
const vm = require("vm")
const { processTopLevelAwait } = require("node-repl-await")

function isRecoverableError(error: any) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message)
  }
  return false
}

// @ts-ignore
async function myEval(code, context, filename, callback) {
  code = processTopLevelAwait(code) || code

  try {
    let result = await vm.runInNewContext(code, context)
    callback(null, result)
  } catch (e) {
    if (isRecoverableError(e)) {
      callback(new repl.Recoverable(e))
    } else {
      console.log(e)
    }
  }
}

let shelling: boolean = false
export async function runShell() {
  shelling = true
  const r = repl.start({ prompt: "> ", eval: myEval })
  // r.context.prisma = prisma
}