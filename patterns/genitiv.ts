import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "~/lib/definePattern"

export default definePattern({
  id: "genitiv",
  slug: "genitive",
  title: "Des Genitivs",
  shortdesc: "For _directly_ belonging to a fluffy squirrel",
  explanation: md`
The least common shiny grammatical case is the genitive case, just like the dative case
it comes into use in sentences which describe posessions or belongings, however in the
case of the genitive case, it's only used on combinations of two direct objects or beings,
for instance to underline the posession of some almonds:

<TextHighlighter parts="directobject, directobject" content="
That is [the almond] of the [squirrel].
"/>

The genitive articles for masculine or neuter nouns are _des_ and _eines_. Feminine nouns in genitiv are identical to dative, receiving _der_ and _einer_. Unlike dative, but similar to nominative, **plurals follow the feminine** and take _der_ as well.

<TextHighlighter parts="directobject, directobject" content="
Das ist [die Mandel] des [Eichhörnchens].
"/>

Notice how _das Eichhörnchen_ changes into _des Eichhörnchens_? This is because for
polysyllabic neuter and masculine nouns end in _-s_ in the genitive case.

<LTable content="
_ / Masculine / Feminine / Neuter
Nominative / der Mond / die Schlange / das Sauerkraut 
Genitive / **des** Mond**es** / **der** Schlange / **des** Sauerkraut**s**
"/>

Of course there are also some exceptions in place with the polysyllabic and monosyllabic nouns mentioned before.
For instance _des Sauerkraut_ is a polysyllabic neuter noun in its genitive form, would we take the monosyllabic variant of just "Kraut", the noun would follow with the _-es_ ending: _des Krautes_.

<DialogueExample content="
lukas:
  Das ist des Krautes Saft!
"/>
<DialogueExample content="
lukas:
  Das ist des Sauerkrauts Saft!
"/>

<Tip title="es-sential vowels" content="
Keep in mind that the _-es_ ending would not apply to words which already end in a vowel like in the case with _der Uhu_, a monosyllabic masculine noun. The correct genitive would be _des Uhus_ in this case.
"/>

<Tip title="apostrophes?" content="
Some nouns already end in _-s_ so one might be inclined to add an apostrophe there, the German language however doesn't use apostrophes so the noun wouldn't change in this case.
"/>
  `,
  story: [
    {
      from: "fox",
      message: "Du hast eine neue Nachricht von dem Präsidenten des Komitees für Astrophysischen Ereignisse erhalten.",
      translation: "You have received a new message of the president of the Astrophysical Events Committee.",
    },
    {
      from: "lindenbaum",
      message: "Was ist es diesmal?",
      translation: "What is it this time?",
    },
    {
      from: "fox",
      message: "Er sagt, dass das Budget der Server eingestellt wird.",
      translation: "He says that the budget of the servers will be cancelled.",
    },
    {
      from: "lindenbaum",
      message: "Und was soll ich mit dem LIGO Projekt, so kurz vor dem Durchbruch machen?",
      translation: "What should I do with the LIGO Project so close to breakthrough?",
    },
    {
      from: "fox",
      message: "Das sollte auch mit dem Geld von unseren alternativen Investoren möglich sein.",
      translation: "That should also be possible with the money of our alternative investors.",
    },
    {
      from: "lindenbaum",
      message: "Na dann nehmen wir mal Kontakt zum Direktor des Instituts für dunkle Anomalieforschung auf!",
      translation: "Well then, let's initiate contact with the director of the institute for dark anomaly research!",
    },
  ],
  exercises: [
    {
      from: "lukas",
      message: "Sorry, ich habe mich verlaufen, als ich die Katze [des] Nachbarn streicheln wollte.",
      translation: "Sorry, I got lost trying to pet the neighbor ['s] cat.",
      hint: "[masculine]",
      explanation: `Here the neighbor owns the cat, so we are using the posessive genitive here. Similiar to the _'s_ and _of the_ in English, the possessive can have the alternative dative writing _von dem_, which has increasingly been replacing the genitive and is one of the reasons the genitive is rarely used. But why is it _Nachbarn_ and not _Nachbars_? Well the story is more complicated since _Der Nachbar_ is an n-noun that is declined in both the weak and mixed group, we weak _des Nachbarn_ is more commonly used nowadays, especially in formal language, but _Des Nachbars_ would also be acceptable as it is in the mixed group.`
    },
    {
      from: "squirrel",
      message: "Bei uns zu Hause gibt es einen Ort namens \"Wald [der] unendlichen Winkel\". Geh da nicht hin.",
      translation: "Back home we have a place called the \"Forest [of] Infinite Angles\". Don't go there.",
      explanation: `The forest _posesses_ infinite angles so we should use the _possessive_ form. However we're explicitly talking about two direct objects in the name of the place, so the genitive must be used here, this is generally the case for any names and titles. Since _Winkel_ is in plural, we use the feminine genetive article _der_.`
    },
    {
      from: "lindenbaum",
      message: "Ich frage mich, ob dies das Werk [eines Fuchses] ist.",
      translation: "I wonder if this is the work [of a fox].",
      hint: "[masculine, Fuchs]"
    },
    {
      from: "fox",
      message: "Das dezentralisierte Verschlüsselung wurde kompromittiert? Hier ist ein Pikachu [der] Überraschung",
      translation: "The decentralized encryption was compromised? Here is a Pikachu [of] Surprise",
      hint: "[feminine]"
    }
  ]
})
