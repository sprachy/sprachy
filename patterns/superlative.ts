import { faMedal } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "~/lib/definePattern"

export default definePattern({
  id: "besten",
  slug: "superlative",
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
You would commonly see the word _am_ like in the phrase _am besten_ placed infront of a superlative which is similar to the _the_ in _the best_. Although you may also use an article infront of the superlative if you're explicitly referring to someone or something, keep in mind the changes to the adjective endings then which generally is the _-en_ ending.
</Tip>`,
  story: [
    // LEVEL 2
    {
      from: "squirrel",
      message: "Spieglein, Spieglein an der Wand, wer ist der flauschigste im ganzen Land?",
      translation: "Mirror, mirror on the wall, who is the fluffiest of them all?",
    },
    {
      from: "mirror",
      message: "Das seid Ihr, mein Meister. Ihr seid das niedlichste Eichhörnchen der Welt.",
      translation: "You are, my master. You are the cutest squirrel in the world.",
    },
    {
      from: "squirrel",
      message: "Und du bist mein gehorsamster Spiegel.",
      translation: "And you are my most obedient mirror.",
    },
    {
      from: "squirrel",
      message: "Am besten wäre jedoch ein Spiegel mit Armen und Beinen...",
      translation: "However, the best would be a mirror with arms and legs...",
    },
    {
      from: "mirror",
      message: "Wahrlich bin ich aber am glanzvollsten.",
      translation: "Surely I am the shiniest",
    },
    {
      from: "squirrel",
      message: "Ich nutze auch mein schönster Glanzzauber.",
      translation: "I'm also using my prettiest glitter spell.",
    },
    {
      from: "squirrel",
      message: "Sodass ich meine niedlichste Kante anschauen kann.",
      translation: "So that I can see my cutest edge.",
    },
    {
      from: "squirrel",
      message: "Ein Augenschmaus für Jederman auf dem die flachsten Lebewesen leben.",
      translation: "A feast for the eyes for everyone on which the flattest creatures live",
    },
    // The direct object of the sentence is the person, not their chocolate side
    // this is why we still get "elegantesten" even though Schokoladenseite is feminine
    // TODO inline explanation feature
    {
      from: "mirror",
      message: "Denkt daran euch auch andersweitig von eurer elegantesten] Schokoladenseite zu zeigen.",
      translation: "Remember to put your most elegant] foot forward on other aspects as well.",
    },
    {
      from: "mirror",
      message: "Denn Ihr seid natürlich auch das charismatischste] Eichhörnchen.",
      translation: "Since naturally you are the most charismatic] squirrel.",
    },
  ],
  exercises: [
    {
      from: "mirror",
      message: "Ich bin der [glanzvollste] Spiegel. Ich bin keine Zeitung.",
      translation: "I am the [shiniest] mirror. I am not a newspaper.",
      hint: "[glanzvoll]"
    },
    {
      from: "squirrel",
      message: "Die Schaffung eines neuen Bewusstseins ist die [höchste] Stufe der Esper-Künste.",
      translation: "The creation of a new consciousness is the [highest] level of esper arts.",
      hint: "[hoch]"
    },
    {
      from: "lukas",
      message: "Der [schönsten] Orte der Erde, den man besuchen kann? Hmm, ich mag die Wasserfälle!",
      translation: "The [nicest] places to visit on Earth? Hmm, I like the waterfalls!",
      hint: "[schön]"
    },
    {
      from: "fox",
      message: "Warum ein Fuchs? Weil Füchse [am besten] sind!",
      translation: "Why a fox? Because foxes are [the best]!"
    }
  ]
})

// [
//   {
//     from: "robot",
//     message: "Am [besten] wäre es für Sie, wenn Sie den Fisch gehorchen würden.",
//     translation: "It would be [best] for you if you obeyed the fish.",
//     hint: "[gut]",
//   },
//   {
//     from: "explorer",
//     message: "Der Fisch scheint wohl nicht das [neutralste] Jury-Mitglied zu sein...",
//     translation: "I guess the fish didn't seem to be the [most neutral] jury member....",
//     hint: "[neutral, neuter]"
//   },
//   {
//     from: "fish",
//     message: "*blub!*",
//     translation: "*blub!*",
//   },
//   {
//     from: "explorer",
//     message: "Ich glaube ich habe [besseres] zu tun.",
//     translation: "I think I have [better] things to do.",
//     hint: "[comparative]",
//   },
//   {
//     from: "explorer",
//     message: "Adieu!",
//     translation: "Adieu!",
//   }
// ]
