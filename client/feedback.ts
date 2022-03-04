import type { FillblankLine } from "../common/Pattern"
import { sprachdex } from "../common/sprachdex"
import { levenshtein } from "./levenshtein"

/**
 * Feedback to be applied across all fillblank exercises, unless
 * overridden by the exercise-specific feedback.
 * 
 * Defined as: { correctAnswer: { attempt: feedbackMessage } }
 * 
 * Make sure to only put stuff in here if it actually makes sense
 * for every exercise where the correct answer would apply.
 */
const defaultFeedback: Record<string, Record<string, string>> = {
  ein: {
    eine: "This is the feminine form. The noun has a different gender."
  },
  mein: {
    meine: "This is the feminine form. The noun has a different gender."
  },
  dein: {
    deine: "This is the feminine form. The noun has a different gender."
  },
  eine: {
    ein: "This is the masculine or neuter form. The noun has a different gender."
  },
  meine: {
    mein: "This is the masculine or neuter form. The noun has a different gender."
  },
  deine: {
    dein: "This is the masculine or neuter form. The noun has a different gender."
  }
}

export function matchAnswer(attempt: string, line: FillblankLine): { validAnswer?: string, feedback?: string } {
  const validAnswer = line.validAnswers.find(ans => ans.toLowerCase() === attempt.toLowerCase())
  if (validAnswer) {
    return {
      validAnswer: validAnswer
    }
  } else {
    return {
      feedback: getFeedback(attempt, line)
    }
  }
}

/**
 * Get some feedback for a wrong answer to a fillblank.
 */
function getFeedback(attempt: string, line: FillblankLine): string | undefined {
  for (const answer of line.validAnswers) {
    const ans = answer.toLowerCase()

    // Prioritize any exercise-specific feedback
    const specificFeedback = line.feedback && line.feedback[attempt]
    if (specificFeedback)
      return specificFeedback

    // Otherwise, we might have some general site-wide feedback for this attempt/answer pair
    const generalFeedback = (defaultFeedback[ans] || {})[attempt]
    if (generalFeedback)
      return generalFeedback
  }

  // Did they just get the casing wrong?
  // if (line.validAnswers.some(ans => ans.toLowerCase() === attempt.toLowerCase())) {
  //   return "That's the right spelling, but the answer has a different capitalization."
  // }

  // Otherwise give some generic feedback based on character diff
  if (line.canonicalAnswer.length < attempt.length) {
    return "The answer is shorter."
  } else if (line.canonicalAnswer.length > attempt.length) {
    return "The answer is longer."
  } else {
    const diff = levenshtein(line.canonicalAnswer.toLowerCase(), attempt.toLowerCase())
    return `The answer is the same length, but ${diff} character${diff == 1 ? ' is' : 's are'} different.`
  }
}
