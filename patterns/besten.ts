import { faChartLine } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "besten",
  slug: "besten",
  title: "Das Superlativ",
  shortdesc: "The second form of the comparsion of adjectives",
  icon: faChartLine,
  explanation: md`
If you want to say that something is the best you use the _superlative_ which is the highest level of the comparsion adjectives.

<ltable translate header="Positive / Comparative / Superlative">
klein / kleiner / kleinst-
gut / besser / best-
alt / älter / ältest-
</ltable>

Have you noticed the pattern? Generally the superlative ends in an _-st_, with the exception that the positive of the adjective is ending in _-d_ or _-t_, in this case the superlatives ends in _-est_ instead.

However the superlative would never appear on its own unlike the comparative, the according adjective endings follow up after the superlative suffix.

<Tip title="Am besten">
You would commonly see the word _am_ like in the phrase _am besten_ placed infront of a superlative which is similar to the _the_ in _the best_. Although you may also use an article infront of the superlative if you're explicitly referring to someone or something, keep in mind the changes to the adjective endings then.
</Tip>`,
  stories: [

    // LEVEL 1
    {
      lines: [
        {
          from: "squirrel",
          message: "Spieglein, Spieglein an der Wand, wer ist der [flauschigste] im ganzen Land?",
          translation: "Mirror, mirror on the wall, who is the [fluffiest] of them all?",
          hint: "[flauschig]",
        },
        {
          from: "mirror",
          message: "Das seid Ihr, mein Meister. Ihr seid das [niedlichste] Eichhörnchen der Welt.",
          translation: "You are, my master. You are the [cutest] squirrel in the world.",
          hint: "[niedlich]",
        },
        {
          from: "squirrel",
          message: "Und du bist mein [gehorsamster] Spiegel.",
          translation: "And you are my [most obedient] mirror.",
          hint: "[gehorsam]",
        },
        {
          from: "squirrel",
          message: "Am [besten] wäre jedoch ein Spiegel mit Armen und Beinen...",
          translation: "However, the [best] would be a mirror with arms and legs....",
          hint: "[gut]",
        },
      ]
    },
  ],
})