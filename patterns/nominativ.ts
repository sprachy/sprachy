import { faChartLine } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "nominativ",
  slug: "nominativ",
  title: "Der Nominativ und das Subjekt",
  shortdesc: "The most common grammatical case used for the subject",
  icon: faChartLine,
  explanation: md`
The standard case we use to portray examples is the _nominative_ case which is used incase a noun is the _subject_ in a sentence. The _subject_ can be seen as its own grammatical component which stands in relation to an _object_ which is never the nominative.

<DialogueExample>
lukas:
  Das Eichhörnchen ist süß.
</DialogueExample>

Here we can see the entire sentence using the _nominative_ case which will be used a lot in examples as it's the most generic case since each sentence is usually guaranteed to have a _subject_.

It's useful to visualize the sentences in their respective components, in the case of _Das Eichhörnchen ist süß_, the basic component structure would be _[article] [subject] [verb] [adjective]_. The nominative in this case affects both the article and the verb which are associated to the noun.

<DialogueExample>
lindenbaum:
  Wer ist Töski?
lukas:
  Das Eichhörnchen.
</DialogueExample>

The nominative is also the standard form to answering _Wer_ (who) questions.`,
  stories: [

    // LEVEL 1
    {
      lines: [
        {
          from: "lukas",
          message: "Wer bist du?",
          translation: "Who are you?"
        },
        {
          from: "squirrel",
          message: "[Ein] Eichhörnchen.",
          translation: "[A] squirrel.",
          hint: "[neuter]",
        },
        {
          from: "lukas",
          message: "Was ist [dein] Name?",
          translation: "What is [your] name?",
          hint: "[masculine]",
        },
        {
          from: "squirrel",
          message: "[Mein] Name ist Töski.",
          translation: "[My] name is Töski.",
          hint: "[masculine]",
        },
      ]
    },
  ],
})