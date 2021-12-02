import marked, { TokenizerExtension } from "marked"

const hoverTranslate: TokenizerExtension = {
  name: "hoverTranslate",
  level: "inline",
  start(src: string) {
    // Hint to Marked.js to stop and check for a match
    return src.match(/=/)?.index || 0
  },
  tokenizer(src: string, tokens: marked.Token[]) {
    const rule = /^=([^=\n]+)=/ // Regex for the complete token
    const match = rule.exec(src)
    if (match) {
      return {
        // Token to generate
        type: "hoverTranslate", // Should match "name" above
        raw: match[0]!, // Text to consume from the source
        ht: this.lexer.inlineTokens(match[1].trim()), // Additional custom properties, including
      }
    } else {
      return
    }
  },
  renderer(token) {
    return `\n<hover-translate>${this.parser.parseInline(
      token.ht
    )}</hover-translate>`
  },
  childTokens: ["hover-translate"], // Any child tokens to be visited by walkTokens
}

marked.use({ extensions: [hoverTranslate] })

export const sprachdown = marked




/** 
 * This is just a reimplementation of default template literals
 * Used to inform syntax highlighting
 */
export function md(strs: TemplateStringsArray, ...substs: any[]) {
  return substs.reduce(
    (prev, cur, i) => prev + cur + strs[i + 1],
    strs[0]
  )
}