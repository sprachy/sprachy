import WinkTokenizer from 'wink-tokenizer'

const tokenizer = new WinkTokenizer()

export function tokenize(s: string): { value: string; tag: string }[] {
  return tokenizer.tokenize(s)
}