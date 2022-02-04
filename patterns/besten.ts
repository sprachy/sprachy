import { faMedal } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "besten",
  slug: "besten",
  title: "Das Superlativ",
  shortdesc: "For when you see the fluffiest squirrel ever",
  icon: faMedal,
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
          from: "robot",
          message: "Am [besten] wäre es für Sie wenn Sie den Fisch gehorchen würden.",
          translation: "It would be [best] for you if you obeyed the fish.",
          hint: "[gut]",
        },
        {
          from: "explorer",
          message: "Der Fisch schein wohl nicht das [neutraliste] Jury-Mitglied zu sein...",
          translation: "I guess the fish didn't seem to be the most [neutral] jury member....",
          hint: "[neutral]"
        },
        {
          from: "fish",
          message: "*blub!*",
          translation: "*blub!*",
        },
        {
          from: "explorer",
          message: "Ich glaube ich habe [besseres] zu tun.",
          translation: "I think I have [better] things to do.",
          hint: "[comparative]",
        },
        {
          from: "explorer",
          message: "Adieu!",
          translation: "Adieu!",
        }
      ]
    },
  ],
})