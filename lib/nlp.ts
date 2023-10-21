
import { numToWord as origNumToWord } from "num-words-de"
// @ts-ignore
import pos from 'pos'

/**
 * Replace umlaut characters with their ascii equivalent. 
 */
export function deumlautify(str: string) {
  return str.replace(/ä/, 'a').replace(/ü/, 'u').replace(/ö/, 'o')
}

/**
 * Make the first letter of a string uppercase.
 */
export function titleCase(str: string) {
  if (!str[0])
    return str
  return str[0].toUpperCase() + str.slice(1)
}

/** 
 * Given a number, returns a textual representation
 * of that number in German
 * 
 * e.g. 21 -> "Einundzwanzig"
 */
export function numToWord(num: number): string {
  if (num === 0) {
    return 'Null'
  }

  if (num < 0) {
    return `Minus ${numToWord(-num)}`
  }

  return origNumToWord(num)
}


export type MultipleChoiceAnswerType = 'yes/no' | 'numeric' | string

/**
 * Find the type of answer for a given English VQA text.
 * Text needs to be of the form:
 * "What is the man doing? snowboarding"
 */
export function getMultipleChoiceAnswerType(qatext: string): MultipleChoiceAnswerType {
  const answer = qatext.split('? ').slice(-1)[0]

  if (answer === 'yes' || answer === 'no') {
    return 'yes/no'
  } else if (answer?.match(/^\d+$/)) {
    return 'numeric'
  }

  const words = new pos.Lexer().lex(qatext)
  const tagger = new pos.Tagger()
  const taggedWords = tagger.tag(words)

  // Return the POS tag of the answer
  // See https://github.com/dariusk/pos-js for possibilities
  return taggedWords[taggedWords.length - 1][1]
}