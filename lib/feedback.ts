import type { FillblankExercise } from "~/lib/Exercise"
import { levenshtein } from "~/lib/levenshtein"
import { deumlautify } from "~/lib/nlp"

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
    ein: "This is the masculine or neuter form. The noun has a different gender (or is pluralized)."
  },
  meine: {
    mein: "This is the masculine or neuter form. The noun has a different gender (or is pluralized)."
  },
  deine: {
    dein: "This is the masculine or neuter form. The noun has a different gender (or is pluralized)."
  }
}

export function matchAnswer(attempt: string, ex: FillblankExercise): { validAnswer?: string, feedback?: string } {
  const validAnswer = ex.validAnswers.find(ans => ans.toLowerCase() === attempt.toLowerCase())
  if (validAnswer) {
    return {
      validAnswer: validAnswer
    }
  } else {
    return {
      feedback: getFeedback(attempt, ex)
    }
  }
}

/**
 * Get some feedback for a wrong answer to a fillblank.
 */
function getFeedback(attempt: string, ex: FillblankExercise): string | undefined {
  for (const answer of ex.validAnswers) {
    const ans = answer.toLowerCase()

    // // Prioritize any exercise/pattern-specific feedback
    // const specificFeedback = ex.feedback && ex.feedback.find(f => f.answer.toLowerCase() === ans && f.attempt.toLowerCase() === attempt.toLowerCase())
    // if (specificFeedback)
    //   return specificFeedback.message

    // Otherwise, we might have some general site-wide feedback for this attempt/answer pair
    const generalFeedback = (defaultFeedback[ans] || {})[attempt]
    if (generalFeedback)
      return generalFeedback
  }

  // Did they just get the casing wrong?
  // if (line.validAnswers.some(ans => ans.toLowerCase() === attempt.toLowerCase())) {
  //   return "That's the right spelling, but the answer has a different capitalization."
  // }

  const ans = ex.validAnswers.find(ans => deumlautify(ans) === deumlautify(attempt))
  if (ans) {
    return `Note the <a href="/faq#typing-in-german" target="_blank">umlauts</a>: _${ans}_!`
  }

  // Otherwise give some generic feedback based on character diff
  if (ex.canonicalAnswer.length < attempt.length) {
    return "The answer is shorter."
  } else if (ex.canonicalAnswer.length > attempt.length) {
    return "The answer is longer."
  } else {
    const diff = levenshtein(ex.canonicalAnswer.toLowerCase(), attempt.toLowerCase())
    return `The answer is the same length, but ${diff} character${diff == 1 ? ' is' : 's are'} different.`
  }
}
