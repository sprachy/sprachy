import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "genitiv",
  slug: "genitiv",
  title: "Des Genitivs",
  shortdesc: "For _directly_ belonging to a fluffy squirrel.",
  icon: faHandHoldingUsd,
  explanation: md`
The least common shiny grammatical case is the genitive case, just like the dative case
it comes into use in sentences which describe posessions or belongings, however in the
case of the genitive case, it's only used on combinations of two direct objects or beings,
for instance to underline the posession of some almonds:

<TextHighlighter parts="directobject, directobject">
That is [the almond] of the [squirrel].
</TextHighlighter>

The easiest way to remember a noun in its genitive case is that its article for masculine or neuter nouns is _des_ and _eines_, whereas feminine nouns are trickier with _der_ and _einer_, sharing the same structure as the dative.

<TextHighlighter parts="directobject, directobject">
Das ist [die Mandel] des [Eichhörnchens].
</TextHighlighter>

Notice how _das Eichhörnchen_ changes into _des Eichhörnchens_? This is because for
polysyllabic neuter and masculine nouns end in _-s_ in the genitive case.

<LTable>
_ / Masculine / Feminine / Neuter
Nominative / der Mond / die Schlange / das Sauerkraut 
Dative / **des** Mond**es** / **der** Schlange / **des** Sauerkraut**s**
</LTable>

Of course there are also some exceptions in place with the polysyllabic and monosyllabic nouns mentioned before.
For instance _des Sauerkraut_ is a polysyllabic neuter noun in its genitive form, would we take the monosyllabic variant of just "Kraut", the noun would follow with the _-es_ ending: _des Krautes_.

<DialogueExample>
lukas:
  Das ist des Krautes Saft!
</DialogueExample>
<DialogueExample>
lukas:
  Das ist des Sauerkrauts Saft!
</DialogueExample>

<Tip title="es-sential vowels">
Keep in mind that the _-es_ ending would not apply to words which already end in a vowel like in the case with _der Uhu_, a monosyllabic masculine noun. The correct genitive would be _des Uhus_ in this case.
</Tip>

<Tip title="apostrophes?">
Some nouns already end in _-s_ so one might be inclined to add an apostrophe there, the German language however doesn't use apostrophes so the noun wouldn't change in this case.
</Tip>
  `,
  stories: [
    // LEVEL 1
    {
      lines: [
        {
          from: "fox",
          message: "Du hast eine neue Nachricht von dem Präsidenten [des Komitees] für Astrophysischen Ereignisse erhalten.",
          translation: "You have received a new message of the president of the Astrophysical Events Committee.",
          hint: "[das Komitee]",
        },
        {
          from: "lindenbaum",
          message: "Was ist es diesmal?",
          translation: "What is it this time?",
        },
        {
          from: "fox",
          message: "Er sagt, dass das Budget [der Server] eingestellt wird.",
          translation: "He says that the budget of the servers will be cancelled.",
          hint: "[die Server]",
        },
        {
          from: "lindenbaum",
          message: "Und was soll ich mit [dem] LIGO Projekt, so kurz vor dem Durchbruch machen?",
          translation: "What should I do with the LIGO Project so close to breakthrough?",
          hint: "[das Projekt]",
        },
        {
          from: "fox",
          message: "Das sollte auch mit [dem Geld] von unseren alternativen Investoren möglich sein.",
          translation: "That should also be possible with the money of our alternative investors.",
          hint: "[das Geld]",
        },
        {
          from: "lindenbaum",
          message: "Na dann nehmen wir mal Kontakt zum Direktor [des Instituts] für dunkle Anomalieforschung auf!",
          translation: "Well then, let's initiate contact with the director of the institute for dark anomaly research!",
          hint: "[das Institut]",
        },
      ]
    },
  ]
})
