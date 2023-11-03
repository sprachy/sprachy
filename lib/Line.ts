import { omit } from "lodash-es"

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
  }

  get parts(): LinePart[] {
    return this.message.split(/(\[.+?\])/).map(part => {
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
    })
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