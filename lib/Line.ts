import { omit, sampleSize, shuffle } from "lodash-es"
import { splitSentences } from "./nlp"

type LineWithMessageDef = {
  from: string
  message: string
  translation: string
}

type LineWithImageDef = {
  image: string
  imageAlt: string
}

type LineWithChoicesDef = {
  choices: { text: string; correct?: boolean }[]
  hint?: string
  correct?: string
  responder?: string
}

export type LineDef = (LineWithMessageDef & LineWithImageDef & LineWithChoicesDef)


export interface Line extends LineDef { }

export type LinePart = {
  type: 'text'
  text: string
} | {
  type: 'blank'
  answer: string
}

export class Line {
  constructor(readonly def: LineDef) {
    Object.assign(this, omit(def, 'translation'))

    if (this.hasBlanks && !this.choices) {
      // XXX temporary hack to keep old fillblanks working
      const germanWords = ["Haus", "Baum", "Weg", "Auto", "Buch", "Hund", "Katze", "Licht", "Sonne", "Mond"]
      this.choices = sampleSize(germanWords, 3).map((word) => ({
        text: word
      }))

      for (const part of this.parts) {
        if (part.type === 'blank') {
          this.choices.push({
            text: part.answer,
            correct: true
          })
        }
      }

      this.choices = shuffle(this.choices)
    }
  }

  get parts(): LinePart[] {
    return this.message?.split(/(\[.+?\])/).map(part => {
      const m = part.match(/\[(.+?)\]/)
      if (m) {
        return {
          type: 'blank',
          answer: m[1]!,
        }
      } else {
        return {
          type: 'text',
          text: part,
        }
      }
    }) || []
  }

  get hasBlanks() {
    return this.parts.length > 1
  }

  get textBeforeBlank() {
    const partsBeforeBlank = []
    for (const part of this.parts) {
      if (part.type === 'text') {
        partsBeforeBlank.push(part.text)
      } else {
        break
      }
    }

    return partsBeforeBlank.join('')
  }

  get speakableTextBeforeBlank() {
    const fullSentences: string[] = []

    for (const sent of splitSentences(this.textBeforeBlank)) {
      if (sent.match(/[\.\?!]$/)) {
        fullSentences.push(sent)
      } else {
        break
      }
    }

    return fullSentences.join(' ')
  }

  get speechDef() {
    return {
      from: this.from,
      message: this.hasBlanks ? this.speakableTextBeforeBlank : this.message
    }
  }

  get speechDefWhenCompleted() {
    return {
      from: this.from,
      message: this.message
    }
  }

  // How many characters we expect to go in the input
  // Length of the longest answer, or the hint if it's longer
  // get inputWidthChars() {
  //   const words = props.exercise.validAnswers
  //   if (props.exercise.hint) {
  //     words.push(props.exercise.hint)
  //   }
  //   const longestAnswer = sortBy(words, (s) => -s.length)[0]
  //   return longestAnswer!.length
  // }

  get translation() {
    return this.def.translation?.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `**${highlight}**`
    })
  }
}

export function parseLine(def: LineDef) {
  return new Line(def)
}