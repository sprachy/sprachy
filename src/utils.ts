
/** parseInt, but throw an error if it's NaN. */
export function expectInt(str: string): number {
  const val = parseInt(str)
  if (isNaN(val)) {
    throw new Error(`Unexpected NaN when parsing string '${str}'`)
  }
  return val
}

export default { expectInt }