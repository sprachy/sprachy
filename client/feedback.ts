import type { FillblankLine } from "../common/Pattern"
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
  attempt = attempt.toLowerCase()

  // First just see if the input exactly matches one of the answers
  const exactAnswer = line.validAnswers.find(ans => ans.toLowerCase() === attempt)
  if (exactAnswer) {
    return {
      validAnswer: exactAnswer
    }
  }

  // If not, check if it's a known invalid answer with feedback
  // We do this before typo matching so that e.g. "ein" isn't considered a typo of "eine"
  const feedback = feedbackCheck(attempt, line)
  if (feedback) {
    return { feedback }
  }


  // If not, try to match accounting for typos
  for (const ans of line.validAnswers) {
    const tolerance = distanceTolerance(ans)
    if (levenshtein(attempt, ans.toLowerCase()) <= tolerance) {
      return {
        validAnswer: ans
      }
    }
  }

  // No valid answer and no feedback to give! Traurig :(
  return {}
}

function feedbackCheck(attempt: string, line: FillblankLine): string | undefined {
  for (const answer of line.validAnswers) {
    const ans = answer.toLowerCase()

    // Prioritize any exercise-specific feedback
    const specificFeedback = line.feedback && line.feedback[attempt]
    if (specificFeedback)
      return specificFeedback

    // Otherwise, we might have some general site-wide feedback
    const generalFeedback = (defaultFeedback[ans] || {})[attempt]
    if (generalFeedback)
      return generalFeedback
  }

  return undefined
}

/**
 * Given a correct answer, returns the maximum levenshtein
 * distance from that answer to consider correct (due to potential typos).
 * 
 * We're more tolerant of typos for longer words.
 */
function distanceTolerance(s: string): number {
  switch (s.length) {
    case 1:
    case 2:
    case 3:
      return 0
    case 4:
    case 5:
      return 1
    case 6:
    case 7:
      return 2
    default:
      return 2 + 1 * Math.floor(s.length / 7)
  }
}
