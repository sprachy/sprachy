import { definePattern, md } from "~/lib/definePattern"

export default definePattern({
  id: "ndeclension",
  slug: "n-declension",
  title: "Dem und den Nachbarn",
  shortdesc: "Why some nouns share the same endings across all cases",
  explanation: md`
When dealing with noun endings across grammatical cases, you may have noticed the reoccuring _-en_ and _-n_ endings.

<LTable content="
_ / Singular / Plural
Nominative / der Hase / die Hase**n**
Accusative / den Hase**n** / die Hase**n**
Dative / dem Hase**n** / den Hase**n**
Genitive / des Hase**n** / der Hase**n**
"/>

As you can see on _der Hase_, n-declension occurs in all cases except for the nominative singular case.
It adds an _-n_ if the noun ends vowels and an _-en_ if it ends in consonants.

The n-declension only occurs on **masculine nouns** which follow a **weak declension** and appear with an **article**.
Those words are usually masculine animals such as _der Rabe, _der Hase_,
masculine persons such as _der Junge_, _der Kunde_,
as well as masculine nationals: _der Deutsche_, _der Franzose_,
and masculine occupations: _der Student_, _der Journalist_.

<Tip title="Weak nouns" content="
Identifying the weak declension on nouns is no easy feat. It is derived from Proto-Germanic word stems which ended in _-n_, which are now categorized as "weak nouns".
As a rule of thumb, you can usually see that a noun is a weak noun if you know that its plural ends in _-n_.
"/>

But as always we're dealing with a few exceptions:

Both __der Bauer__ and __der Nachbar__ use an _-n_ ending despite ending in a consonant.

<LTable content="
_ / Singular / Plural
Nominative / der Nachbar / die Nachbar**n**
Accusative / den Nachbar**n** / die Nachbar**n**
Dative / dem Nachbar**n** / den Nachbar**n**
Genitive / des Nachbar**n** / der Nachbar**n**
"/>

<DialogueExample content="
lukas:
  Was ist die Schreibform deines Name**ns**?
"/>

A few nouns using the n-declension have the ending _-(e)ns_ in the genitive singular, some of those nouns are: _der Name_, _der Friede_, _der Gedanke_, _der Galube_, _der Wille_.

<LTable content="
_ / Singular / Plural
Nominative / der Friede / die Friede**n**
Accusative / den Friede**n** / die Friede**n**
Dative / dem Friede**n** / den Friede**n**
Genitive / des Friede**ns** / der Friede**n**
"/>

<DialogueExample content="
squirrel:
  Warum schreibst du so viele Herz**en**?
"/>

A very special case is the heart! __Das Herz__ is a neutral noun but it uses the n-declension in the plural cases and the singular genitive case, as the only non-masculine noun.

<LTable content="
_ / Singular / Plural
Nominative / das Herz / die Herz**en**
Accusative / den Herz / die Herz**en**
Dative / dem Herz / den Herz**en**
Genitive / des Herz**ens** / der Herz**en**
"/>

<DialogueExample content="
harald:
  Dürfte ich den Herr**en** einen Besuch abstatten?
"/>

Another unique case is the noun _der Herr_ which ends in _-n_ in singular and _-en_ in plural.

<LTable content="
_ / Singular / Plural
Nominative / der Herr / die Herr**en**
Accusative / den Herr**n** / die Herr**en**
Dative / dem Herr**n** / den Herr**en**
Genitive / des Herr**n** / der Herr**en**
"/>

<Tip title="Fading usage" content="
The usage of n-declension is fading and more frequently left out entirely.
A good example would be the usage of _den Nachbar_ being more common than _den Nachbarn_ nowadays.
Both spelling are grammatically correct however.
"/>
`
  ,
  story: [
    {
      from: "squirrel",
      message: "Warum hat dieses Menschen-Gebäude soviele Eingänge?",
      translation: "Why does this human-building have so many entrances?",
    },
    {
      from: "lukas",
      message: "Das sind die Eingangstüren meiner Nachbarn, das sind Menschen wie ich, die dasselbe Gebäude teilen.",
      translation: "These are the front doors of my neighbors, these are humans like me who share the same building.",
    },
    {
      from: "squirrel",
      message: "Dann hätte ich einen Hinweis für den Architekten.",
      translation: "Then I would have a hint for the architect.",
    },
    {
      from: "squirrel",
      message: "Baut nicht zu viele Türen!",
      translation: "Do not build too many doors!",
    },
    {
      from: "lukas",
      message: "Aber wir haben den Willen nach Privatsphäre...",
      translation: "But we have the will for privacy...",
    },
    {
      question: `Did you notice what the grammatical case of _Willen_ is?`,
      choices: [
        { text: "accusative", correct: true },
        { text: "dative" },
        { text: "nominative" }
      ]
    },
    {
      from: "squirrel",
      message: "Was ist _Privatsphäre_?.",
      translation: "What is _privacy_?",
    },
    {
      from: "lukas",
      message: "Wenn du einen Menschen siehst möchte dieser manchmal nicht gestört werden.",
      translation: "When you see a person, sometimes they don't want to be disturbed.",
    },
    {
      from: "lukas",
      message: "Um ihn herum ist dann eine Art Sphäre, die du nicht ungefragt betreten solltest, wir nennen es die Privatsphäre.",
      translation: "Around him then is a kind of sphere that you should not enter unasked, we call it the privacy.",
    },
    {
      from: "squirrel",
      message: "Interessant, ihr besitzt also eine mir unbekannte Esper-Fähigkeit.",
      translation: "Interesting, so you have an Esper ability I don't know about.",
    },
  ],
  exercises: [
    {
      from: "squirrel",
      message: "Eure [Herzen] sind anatomisch inkorrekt!",
      translation: "Your [hearts] are anatomically incorrect!",
      hint: "[Herz]",
    },
    {
      from: "fox",
      message: "Ich warne: Sie haben den [Agenten] losgeschickt.",
      translation: "I'm warning: they sent the [agent] out.",
      hint: "[Agent]",
    },
    {
      from: "lindenbaum",
      message: "Dann muss ich dem [Präsidenten] des Komitees für Astrophysischen Ereignisse wieder antworten...",
      translation: "Then I have to answer to the [president] of the Astrophysical Events Committee again....",
      hint: "[Präsident]",
    }
  ]
})