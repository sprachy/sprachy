import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "adjective-endings",
  slug: "adjective-endings",
  title: "Adjective endings",
  shortdesc: "",
  icon: faExclamation,
  draft: true,
  explanation: md`
Consider the difference between these two phrases:

<DialogueExample>
lukas:
  Das Eichhörnchen und der starke Kaffee vertragen sich nicht.
  The squirrel and the strong coffee don't mix.
</DialogueExample>

<DialogueExample>
lukas:
  Eichhörnchen und starke**r** Kaffee vertragen sich nicht.
  Squirrels and strong coffee don't mix.
</DialogueExample>

Notice how an **r** gets added to the adjective in the second example? Because there is no _der_, the adjective _starke_ becomes _starker_ to indicate the gender of the masculine noun _Kaffee_.

The general pattern is: when there is no _der-_ or _ein-_ type word preceding a noun, it is instead the adjective that changes form to indicate gender and case.

<LTable>
_ / Masculine / Feminine / Neuter / Plural
Nominative / weicher Flaum / ewige Liebe / geheimes Wissen / süße Freunde
Accusative / weichen Flaum / ewige Liebe / geheimes Wissen / süße Freunde
Dative / weichem Flaum / ewiger Liebe / geheimem Wissen / süßen Freunden
Genitive / weichen Flaumes / ewiger Liebe / geheimen Wissens / süßer Freunde
</LTable>
`
  ,
  story: [
    {
      from: "squirrel",
      message: "Was trinkst du da?",
      translation: "What are you drinking?"
    },
    {
      from: "lukas",
      message: "Grüner Tee! Das ist gesund für den Menschen.",
      translation: "Green tea! It's healthy for humans."
    },
    {
      question: "Why does Lukas say 'grüner' instead of 'grüne'?",
      choices: [
        { text: "Since there's no article, the adjective indicates the gender of _der Tee_", correct: true },
        { text: "The phrase is in the dative case, which adds an -r" },
        { text: "He's secretly a pirate" }
      ]
    },
    {
      from: "squirrel",
      message: "Und was trinkt Anna?",
      translation: "And what is Anna drinking?"
    },
    {
      from: "anna",
      message: "Das ist starker Kaffee. Ich habe nicht viel Schlaf bekommen.",
      translation: "That is strong coffee. I didn't get much sleep."
    },
    {
      question: "What kind of coffee does Anna say she is drinking?",
      choices: [
        { text: "Strong coffee", correct: true },
        { text: "Stronger coffee" },
      ]
    }
  ],
  exercises: [
    // {
    //   from: "squirrel",
    //   message: "[Mach] deinen Zug, Mensch!",
    //   translation: "[Make] your move, human!",
    //   hint: "[machen]",
    //   explanation: `This is a command for someone to do something, so it's imperative form. Verbs in imperative form tend to use their stem form with no prefix or suffix, so _machen_ becomes _mach_.`
    // },
  ]
})