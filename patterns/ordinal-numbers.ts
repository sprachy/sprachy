import { faToiletsPortable } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "~/lib/definePattern"

export default definePattern({
  id: "ordinalnumbers",
  slug: "ordinal-numbers",
  title: "Das erste Eichhörnchen",
  shortdesc: "Why the first and the third are different from the second.",
  explanation: md`
<DialogueExample content="
squirrel:
  Ich bin also das **erste** außerirdische Eichhörnchen?
  So I am the **first** alien squirrel?
"/>

Just like in English, ordinal numbers are used to state the order for which a thing appears in.

To form the ordinal number, you add an _-te_ ending to numbers between one and 19 and the ending _ste_ to all other numbers which don't end in one to 19.

<LTable header="Cardinal / Ordinal" content="
eins / das erste Haus
zwei / das zweite Haus
drei / das dritte Haus
vier / das vierte Haus
fünf / das fünfte Haus
sechs / das sechste Haus
sieben / das siebte Haus
zwanzig / das zwanzigste Haus
einhundertundzwei / das einhundertundzweite Haus
"/>

However there are some irregular numbers as you've seen on the table above, _das erste_, _das dritte_, and _das siebte_, are all irregular ordinal numbers, which change up the cardinal number.

<DialogueExample content="
squirrel:
  Das ist bereits der **38543.** Planet, den ich besucht habe.
  This already is the **38543rd** planet that I have visited.
"/>

If the ordinal number is written as a digit, you simply follow the digit by a period, similar to the _-th_ ending in English.

<Tip title="Beim ersten Haus" content="
Ordinal numbers follow the same rules as adjectives, as such the ending may change accordingly, for example the ending changes to _-ten_ when the number is used for a dative noun: **dem ersten Eichhörnchen**
"/>
`
  ,
  story: [
    {
      from: "lukas",
      message: "Du bist das erste außerirdische Lebewesen, das ich je gesehen habe.",
      translation: "You are the first alien creature I have ever seen.",
    },
    {
      from: "squirrel",
      message: "Was ist ein _Außerirdischer_?.",
      translation: "What is an _alien_?.",
    },
    {
      from: "lukas",
      message: "Ein Außerirdischer ist eine Lebensform, die nicht von der Erde stammt.",
      translation: "An alien is a living being that doesn't come from Earth.",
    },
    {
      from: "lukas",
      message: "Hast du denn schon viele Außerirdische gesehen?",
      translation: "Have you seen many aliens before?",
    },
    {
      from: "squirrel",
      message: "Es gibt viele in eurem Universum, ihr seid die 5999. Außerirdische Spezies, die ich begegnet bin.",
      translation: "There are many in your universe, you are the 5999th alien species I have encountered.",
    },
    {
      from: "lukas",
      message: "Und wie sehen die Außerirdische aus?",
      translation: "And what do the aliens look like?",
    },
    {
      from: "squirrel",
      message: "Ähnlich wie eure Bakterien, nur oft ein wenig größer.",
      translation: "Similar to your bacteries, but often a bit bigger.",
    },
    {
      from: "lukas",
      message: "Und hast du auch intelligente Lebewesen gesehen, so wie du und ich?",
      translation: "And have you seen intelligent life forms, like you and me?.",
    },
    {
      from: "squirrel",
      message: "Ja, aber es gibt nicht viele in eurem Universum.",
      translation: "Yes, but there are not many in your universe",
    },
    {
      from: "squirrel",
      message: "Ihr seid die vierte intelligente Spezies, die ich gefunden habe.",
      translation: "You are the fourth intelligent species I have found.",
    },
    {
      from: "lukas",
      message: "Faszinierend! Welche Zivilisationen hast du gefunden?",
      translation: "Fascinating! What civilizations have you found?",
    },
    {
      from: "squirrel",
      message: "Die dritte, die ich gefunden habe, hatte bereits ihre halbe Galaxie unter Kontrolle.",
      translation: "The third one I found already had half its galaxy under control.",
    },
    {
      from: "squirrel",
      message: "Sie waren gerade dabei, ihre siebzehnte Dyson-Sphäre fertigzustellen.",
      translation: "They were in the process of finishing their seventeeth dyson sphere.",
    },
  ],
  exercises: [
    {
      from: "lindenbaum",
      message: "Das ist schon die [vierzigste] Studie darüber.",
      translation: "This is already the [fortieth] study about it.",
      hint: "[vierzig]"
    },
    {
      from: "lukas",
      message: "Das war aber schon deine [fünfundfünfzigste] Mandel!",
      translation: "But that was already your [fifty-fifth] almond!",
      hint: "[fünfundfünfzig]"
    },
    {
      from: "mirror",
      message: "Ich bin nur das [zweite] Abbild von dir.",
      translation: "I am only the [second] image of you.",
    },
    {
      from: "squirrel",
      message: "Dies ist bereits der [38543.] Planet, den ich besucht habe",
      translation: "This already is the [38543rd] planet that I have visited",
    }
  ]
})