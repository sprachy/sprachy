import { test, expect } from 'vitest'
import { getMultipleChoiceAnswerType, numToWord } from '~/lib/nlp'

test('numToWord', () => {
  expect(numToWord(0)).toBe('Null')
  expect(numToWord(1)).toBe('Eins')
  expect(numToWord(-5)).toBe('Minus Fünf')
  expect(numToWord(21)).toBe('Einundzwanzig')
})

test('getMultipleChoiceAnswerType', () => {
  expect(getMultipleChoiceAnswerType("Is this a fish? yes")).toBe("yes/no")
  expect(getMultipleChoiceAnswerType("Is this a fish? no")).toBe("yes/no")
  expect(getMultipleChoiceAnswerType("How many fish are there? 10")).toBe("numeric")
  expect(getMultipleChoiceAnswerType("What are the people doing? laughing")).toBe("VBG")
  expect(getMultipleChoiceAnswerType("What is in front of the fish? food")).toBe("NN")
})