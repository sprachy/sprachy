/**
 * Replace umlaut characters with their ascii equivalent. 
 */
export function deumlautify(str: string) {
  return str.replace(/ä/, 'a').replace(/ü/, 'u').replace(/ö/, 'o')
}

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