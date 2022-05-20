import { faCat } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "compound-words",
  slug: "compound-words",
  title: "Compound words",
  shortdesc: `Fledermaus (bat) is "flutter mouse"`,
  icon: faCat,
  explanation: md`
In many languages, humans like to create new words by smooshing together two or more existing ones. The meaning of the new word may be immediately obvious from the roots, or it might derive it in a more subtle or historical way. For example, in English:

<LTable header="Compound / Etymology">
blueberry / blue + berry: Obviously it's a berry, and it's blue. Note how it doesn't refer to _any_ blue berry though, only the blueberry!
flashback / flash + back: A "flash" of memory back to the past, by analogy to a flash of light.
strawberry / straw + berry: Not in the sense of the material "straw", but rather the historical meaning "that which has been strewn".
</LTable>

Recognizing this pattern is helpful when learning a language: you can sometimes infer the meaning of an unknown compound word if you already know the roots. It can also help you recall words once you do know the meaning, since the literal translations are often quite silly and memorable. For example:

<LTable header="Compound / Etymology">
die Fledermaus (the bat) / "flutter mouse" - From Old German fledarōn (flutter) and _die Maus_.
das Faultier (the sloth) / "lazy animal" - From _faul_ + _das Tier_.
das Wasserschwein (the capybara) / "water pig" - From _das Wasser_ + _das Schwein_.
</LTable>

Note how compound nouns inherit the gender of their ending root. The many German animal names ending in _tier_ all use _das_.

Many verbs in German are formed by adding a prefix like _ein-_ or _ver-_ to a another verb, like _kaufen_ (to buy) => _einkaufen_ (to shop). These are a bit quirky and the meaning is not always easily inferrable; we'll cover separable and inseperable verb prefixes in another pattern.

In English, we often make new words not by combining existing English words, but from Latin or Greek roots. This is especially true for medical or scientific terminology. In German, it's much more common to just use German roots. The English word [paramecium](https://en.wikipedia.org/wiki/Paramecium) is derived from Ancient Greek, but in German it's just [das Pantoffeltierchen](https://de.wikipedia.org/wiki/Pantoffeltierchen) ("slipper animal little").

German sometimes likes to take compound words to extreme lengths. Names for government programs are particularly notorious for this, such as [das Bundesausbildungsförderungsgesetz](https://en.wikipedia.org/wiki/BAf%C3%B6G), the Federal Training Assistance Act in Germany-- which most people quite reasonably abbreviate to BAföG. Good to master compounds if you need to submit forms in Germany!
  `,
  story: [
    {
      from: "squirrel",
      message: "Was ist dieses kleine schleimige Tier?",
      translation: "What is this small slimy animal?",
    },
    {
      from: "lukas",
      message: "Das ist eine **Nacktschnecke**.",
      // translation: "That is a slug."
    },
    {
      from: "squirrel",
      message: "Ach so, ich verstehe! Sie ist wie eine Schnecke, aber nackt.",
      translation: "Aha, I see! It is like a snail, but naked.",
    },
    {
      question: `Was bedeutet "Nacktschnecke"?`,
      translation: "What does \"Nacktschnecke\" mean?",
      choices: [
        { text: "turtle" },
        { text: "slug", correct: true },
        { text: "snake" },
        { text: "frog" },
      ]
    },
    {
      from: "lukas",
      message: "Ja, du hast recht!",
      translation: "Yes, you are right!"
    }
  ],
  exercises: [
    {
      from: "squirrel",
      message: "[Die] Nüsschen auf diesem Planeten sind besonders lecker. Zu Hause ist das ein gut gehütetes Geheimnis.",
      translation: "[The] little nuts on this planet are especially delicious. It's a well-kept secret back home."
    },
  ]
})



    // // LEVEL 1
    // {
    //   lines: [
    //     {
    //       from: "lukas",
    //       message: "Oh je, [das] Eichhörnchen liegt auf dem Tisch.",
    //       translation: "Oh dear, [the] squirrel is on the table."
    //     },
    //     {
    //       from: "squirrel",
    //       message: "Wie nennt man diese kleine gebogene Waffe?",
    //       translation: "What do you call this tiny curved weapon?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Das ist [ein] Löffelchen. Es ist ein Werkzeug zum Essen, keine Waffe.",
    //       translation: "That is [a] little spoon. It's a tool for eating, not a weapon."
    //     },
    //     {
    //       from: "squirrel",
    //       message: "Und was ist diese zähflüssige alchemistische Lösung?",
    //       translation: "And what is this viscous alchemical solution?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Töski, bitte steck [dein] Pfötchen nicht in die Suppe.",
    //       translation: "Töski, please don't put [your] little paw in the soup."
    //     }
    //   ]
    // },
