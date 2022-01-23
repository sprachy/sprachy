import { faHandSparkles } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

// https://german.stackexchange.com/questions/3834/what-is-the-gender-distribution-of-nouns-in-the-german-language
export default definePattern({
  id: "intro",
  slug: "intro",
  title: "Introduction",
  shortdesc: "Learning the German language",
  icon: faHandSparkles,
  explanation: md`


  
Sprachy teaches what we call the _patterns_ of the language. Patterns are similar to "rules of grammar", but less strictly defined. Languages are organic, evolving entities defined by the consensus of their speakers; it's not quite accurate to say they have "rules"! 

Learn well, und Spaß haben!
  `,
  stories: [
    // LEVEL 1
    {
      lines: [
        {
          from: "lukas",
          message: "Hallo! Ich [bin] Lukas.",
          translation: "Hello! I [am] Lukas.",
          explanation: "Sprachy exercises involve filling the blanks in lines of dialogue. You can say _I am_ in German as _Ich bin_, so the answer here is _bin_."
        },
        {
          from: "lukas",
          message: "[Ich] bin ein Student.",
          translation: "[I] am a student.",
          explanation: "Answers can often be inferred from context and the English translations. For example, the answer here is made clear by the previous line."
        },
        {
          from: "lukas",
          message: "Ich liebe Tee und flauschige Geschöpfe.",
          translation: "I love tea and fluffy creatures.",
          explanation: "Not all lines will have an exercise in them. You can press Enter or click Continue to proceed."
        },
        {
          from: "lukas",
          message: "Lasst uns gemeinsam [Deutsch] lernen!",
          translation: "Let's learn [German] together!",
          hint: "[Deutsch]",
          explanation: "Sometimes a answer box will have a hint, when you might need more info to get the answer."
        },
      ]
    },
  ],
})
