import _ from "lodash"

/** 
 * This is just a reimplementation of default template literals
 * Used to inform syntax highlighting of markdown
 */
export function md(strs: TemplateStringsArray, ...substs: any[]) {
  return substs.reduce(
    (prev, cur, i) => prev + cur + strs[i + 1],
    strs[0]
  )
}

export async function delay(amount: number) {
  return new Promise(resolve => {
    _.delay(resolve, amount)
  })
}