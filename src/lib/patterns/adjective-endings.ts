import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "adjective-endings",
  slug: "adjective-endings",
  title: "Grüner Tee",
  shortdesc: "Adjective endings for nouns without articles",
  icon: faExclamation,
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

The general pattern is: when there is no _der-_ or _ein-_ type word preceding a noun, it is instead the adjective that indicates gender and case.

<LTable>
_ / Masculine / Feminine / Neuter / Plural
Nominative / weicher Flaum / ewige Liebe / geheimes Wissen / süße Freunde
Accusative / weichen Flaum / ewige Liebe / geheimes Wissen / süße Freunde
Dative / weichem Flaum / ewiger Liebe / geheimem Wissen / süßen Freunden
Genitive / weichen Flaumes / ewiger Liebe / geheimen Wissens / süßer Freunde
</LTable>

In the example with the article you can also notice that it's _der starke Kaffee_, where the adjective _stark_ has an **e** added to it.

Even though it's the article's job to indicate the gender and case, the adjective still changes, it is different for _der-_ and _ein-_ words:

<LTable>
der- words / Masculine / Feminine / Neuter / Plural
Nominative / der weiche Flaum / die ewige Liebe / das geheime Wissen / die süßen Freunde
Accusative / den weichen Flaum / die ewige Liebe / das geheime Wissen / die süßen Freunde
Dative / dem weichen Flaum / der ewigen Liebe / dem geheimen Wissen / den süßen Freunden
Genitive / des weichen Flaumes / der ewigen Liebe / des geheimen Wissens / der süßen Freunde
</LTable>

<LTable>
ein- words / Masculine / Feminine / Neuter / Plural
Nominative / ein weicher Flaum / eine ewige Liebe / ein geheimes Wissen / meine süßen Freunde
Accusative / einen weichen Flaum / eine ewige Liebe / ein geheimes Wissen / meine süßen Freunde
Dative / einem weichen Flaum / einer ewigen Liebe / einem geheimen Wissen / meinen süßen Freunden
Genitive / eines weichen Flaumes / einer ewigen Liebe / eines geheimen Wissens / meiner süßen Freunde
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
        { text: "Since there's no article, the adjective indicates the gender of \"der Tee\"", correct: true },
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
    {
      from: "mirror",
      message: "Ihr seid ein [schlauer] Fuchs.",
      translation: "You are a [clever] fox.",
      hint: "[schlau]"
    },
    {
      from: "lindenbaum",
      message: "Dies sind die Studien des [nervigen] Professors",
      translation: "Those are the studies of the [annoying] professor.",
      hint: "[nervig]"
    },
    {
      from: "squirrel",
      message: "[Komische] Menschen...",
      translation: "[Weird] humans...",
      hint: "[komisch]"
    },
    {
      from: "fox",
      message: "Die [schnelle] Analyse ergibt: Es handelt sich um eine Kugel.",
      translation: "The [quick] analysis shows: It is an orb.",
      hint: "[schnell]"
    },
    {
      from: "squirrel",
      message: "Ich verlange noch mehr [sanfte] Zärtlichkeiten!",
      translation: "I ask for more [gentle] caresses!",
      hint: "[sanft]"
    },
  ]
})