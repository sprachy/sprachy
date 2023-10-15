import { definePattern, md } from "~/lib/definePattern"
import sonne from "~/assets/sonne.webp"
import acornImg from "~/assets/acorn.webp"
import bunnyImg from "~/assets/bunny.webp"
import treeHouseImg from "~/assets/tree-house.webp"
import shoppingCartImg from "~/assets/shopping-cart.webp"

// https://german.stackexchange.com/questions/3834/what-is-the-gender-distribution-of-nouns-in-the-german-language
export default definePattern({
  id: "der-die-das",
  slug: "nominative",
  title: "Der, die, das",
  shortdesc: "Ah yes, the three genders",
  explanation: md`
Der, die, and das are three ways of saying _the_ in German. Which one you use depends on the _grammatical gender_ of the noun that follows.

<LTable header="Gender / Deutsch / Meaning" content="
neuter / **das** Eichhörnchen / **the** squirrel
masculine / **der** Baum / **the** tree
feminine / **die** unendliche Leere / **the** infinite void
"/>

These are all in what's called the _nominative case_, the case where we're talking about the subject of a sentence (like a squirrel), unmodified by any verbs.

The gender of a particular noun usually has nothing to do with what that word describes. It's not that trees are particularly manly, or that ominous voids are particularly girly. That's simply the _grammatical_ gender those nouns happen to have, by consensus of German speakers.

Generally, you want to learn the gender together with the word. Rather than remembering that _Baum_ means tree, try to remember _der Baum_! However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.

Roughly speaking, around 40% of nouns are masculine, 40% are feminine, and 20% are neuter. A very small number of words have more than one gender. They're fancy and rare like shiny Pokémon!

<DialogueExample content="
squirrel:
  Aber **die** Plurale!
  But **the** plurals!
"/>

For plurals, we always use _die_, regardless of the noun's base gender. For example, _der Baum_ would become _die Bäume_ when talking about mulitiple trees. Meanwhile, _das_ when used without a noun can also have the meaning of "that" or "it".

<Tip content="
Unlike in English, the first letter of every noun in German is **C**apitalized. This is particularly useful when learning the language, as it makes nouns easy to identify.
"/>
  `,
  /**
   * Since this is the first pattern, we only expect user to remember these points:
   * - word choice depends on noun gender
   * - masculine => der
   * - neuter => das
   * - feminine => die
   * - plural => die
   * - das can also mean "that"
   *
   * They aren't yet expected to actually know the gender of any specific nouns, since
   * we haven't taught them any-- so it should always be hinted in the exercise.
   *
   * Plurals don't need to be hinted though since it's clear from the translation when
   * a plural is being used.
   */
  story: [
  ],
  exercises: [
    // {
    //   from: "squirrel",
    //   message: "[Die] Cashew ist auf eine höhere Ebene aufgestiegen.",
    //   translation: "[The] cashew has ascended to a higher plane.",
    //   hint: "[feminine]"
    // },
    // {
    //   from: "lukas",
    //   message: "[Die] außerirdische Lebensform ist niedlich.",
    //   translation: "[The] alien lifeform is cute.",
    //   hint: "[feminine]"
    // },
    // {
    //   from: "lindenbaum",
    //   message: "[Das] Universum ist größer als wir wissen.",
    //   translation: "[The] universe is vaster than we know.",
    //   hint: "[neuter]"
    // },
    // {
    //   from: "fox",
    //   message: "[Der] Shiba Inu ist ironisch.",
    //   translation: "[The] Shiba Inu is ironic.",
    //   hint: "[masculine]"
    // }
    {
      from: 'squirrel',
      type: 'choice',
      image: acornImg,
      message: `Wie nennt man diese köstliche Frucht?`,
      translation: "What do you call this delicious fruit?",
      hint: "feminine",
      choices: [
        { text: "**der** Eichel", correct: false },
        { text: "**die** Eichel", correct: true },
        { text: "**das** Eichel", correct: false },
        { text: "**ein** Eichel", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: bunnyImg,
      message: `Wer springt herum?`,
      translation: "Who is hopping around?",
      hint: "masculine",
      choices: [
        { text: "**eine** Hase", correct: false },
        { text: "**der** Hase", correct: true },
        { text: "**das** Hase", correct: false },
        { text: "**die** Hase", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: treeHouseImg,
      message: `Wie nennt man diese Unterkunft?`,
      translation: "What do you call this dwelling?",
      hint: "neuter",
      choices: [
        { text: "**den** Baumhaus", correct: false },
        { text: "**der** Baumhaus", correct: false },
        { text: "**das** Baumhaus", correct: true },
        { text: "**die** Baumhaus", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: shoppingCartImg,
      message: `Wie nennt man diese viele Rad-Kisten?`,
      translation: "What do you call these many wheel boxes?",
      hint: "plural",
      choices: [
        { text: "**eine** Einkaufswagen", correct: false },
        { text: "**dem** Einkaufswagen", correct: false },
        { text: "**das** Einkaufswagen", correct: false },
        { text: "**die** Einkaufswagen", correct: true }
      ]
    },
  ]
})



// LEVEL 2
// {
//   lines: [
//     {
//       from: "explorer",
//       message: "[Die] Stadt ist uralt.",
//       translation: "[The] city is ancient.",
//       hint: "[feminine]"
//     },
//     {
//       from: "explorer",
//       message: "[Die] Gebäude sind alle überwuchert und bröckeln.",
//       translation: "[The] buildings are all overgrown and crumbling.",
//       hint: "[plural]"
//     },
//     {
//       from: "robot",
//       message: "Verkehrsverstoß entdeckt. [Der] Verdächtige wird mit uns kommen.",
//       translation: "Traffic violation detected. [The] suspect will come with us.",
//       hint: "[masculine]"
//     },
//     {
//       from: "explorer",
//       message: "[Der] antike Roboter verhaftet mich?",
//       translation: "[The] ancient robot is arresting me?",
//       hint: "[masculine]"
//     },
//     {
//       from: "robot",
//       message: "[Die] Hauptstraße ist kein geeigneter Ort für archäologische Geräte.",
//       translation: "[The] main road is not an appropriate place for archaeological equipment.",
//       hint: "[feminine]"
//     },
//   ]
// },

// // LEVEL 3
// {
//   lines: [
//     {
//       from: "lindenbaum",
//       message: "[Die] Physik funktioniert, weil die Realität über die Zeit hinweg konsistent ist.",
//       translation: "Physics works because reality is consistent through time.",
//       hint: "[feminine]",
//     },
//     {
//       from: "lindenbaum",
//       message: "Wir können [die] Zukunft vorhersagen, weil sie sich wie die Vergangenheit verhält.",
//       translation: "We can predict [the] future because it behaves like the past.",
//       hint: "[feminine]",
//     },
//     {
//       from: "lindenbaum",
//       message: "Aber was passiert, wenn [die] Grundkonstanten nicht wirklich konstant sind? Meine Arbeit geht dieser Frage nach.",
//       translation: "But what happens if [the] fundamental constants are not truly constant? My work explores this.",
//       hint: "[feminine]",
//     },
//     {
//       from: "reporter",
//       message: "Warum sollte [der] Steuerzahler angesichts des Mangels an praktischen Anwendungen Ihre Studie finanzieren?",
//       translation: "Why should [the] taxpayer fund your study, given the lack of practical applications?",
//       hint: "[masculine]"
//     },
//     {
//       from: "lindenbaum",
//       message: "Weil [die] Forschung verdammt cool ist!",
//       translation: "Because [the] research is hecking cool!",
//       hint: "[feminine]",
//     },
//   ]
// }