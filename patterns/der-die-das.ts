import { faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

// https://german.stackexchange.com/questions/3834/what-is-the-gender-distribution-of-nouns-in-the-german-language
export default definePattern({
  id: "der-die-das",
  slug: "der-die-das",
  title: "Der, die, das",
  shortdesc: "Ah yes, the three genders",
  icon: faVenusMars,
  explanation: md`
Der, die, and das are three ways of saying _the_ in German. Which one you use depends on the _grammatical gender_ of the noun that follows.

<LTable header="Gender / Deutsch / Meaning">
neuter / **das** Eichhörnchen / **the** squirrel
masculine / **der** Baum / **the** tree
feminine / **die** unendliche Leere / **the** infinite void
</LTable>

The gender of a particular noun usually has nothing to do with what that word describes. It's not that trees are particularly manly, or that ominous voids are particularly girly. That's simply the _grammatical_ gender those nouns happen to have, by consensus of German speakers.

However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.

Roughly speaking, around 40% of nouns are masculine, 40% are feminine, and 20% are neuter. A very small number of words have more than one gender. They're fancy and rare like shiny Pokémon!

<DialogueExample>
squirrel:
  Aber **die** Plurale!
  But **the** plurals!
</DialogueExample>

For plurals, we always use _die_, regardless of the noun's base gender. For example, _der Baum_ would become _die Bäume_ when talking about mulitiple trees. Meanwhile, _das_ when used without a noun can also have the meaning of "that" or "it".

<Tip>
Unlike in English, the first letter of every noun in German is **C**apitalized. This is particularly useful when learning the language, as it makes nouns easy to identify.
</Tip>
  `,
  stories: [
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

    // LEVEL 1
    {
      lines: [
        {
          from: "lukas",
          message: "Ich glaube, ich werde spazieren gehen.",
          translation: "I think I will go for a walk."
        },
        {
          from: "lukas",
          message: "[Die] Welt ist heute friedlich.",
          translation: "[The] world is peaceful today.",
          hint: "[feminine]",
        },
        {
          from: "squirrel",
          message: "Hallo. [Der] Baum hier ist gemütlich.",
          translation: "Hello. [The] tree here is comfy.",
          hint: "[masculine]",
        },
        {
          from: "lukas",
          message: "[Das] Eichhörnchen... redet mit mir?",
          translation: "[The] squirrel... is talking to me?",
          hint: "[neuter]",
        },
        {
          from: "squirrel",
          message: "[Die] Nüsse hier sind auch sehr lecker.",
          translation: "[The] nuts here are also very tasty.",
        },
      ]
    },

    // LEVEL 2
    {
      lines: [
        {
          from: "explorer",
          message: "[Die] Stadt ist uralt.",
          translation: "[The] city is ancient.",
          hint: "[feminine]"
        },
        {
          from: "explorer",
          message: "[Die] Gebäude sind alle überwuchert und bröckeln.",
          translation: "[The] buildings are all overgrown and crumbling.",
          hint: "[plural]"
        },
        {
          from: "robot",
          message: "Verkehrsverstoß entdeckt. [Der] Verdächtige wird mit uns kommen.",
          translation: "Traffic violation detected. [The] suspect will come with us.",
          hint: "[masculine]"
        },
        {
          from: "explorer",
          message: "[Der] antike Roboter verhaftet mich?",
          translation: "[The] ancient robot is arresting me?",
          hint: "[masculine]"
        },
        {
          from: "robot",
          message: "[Die] Hauptstraße ist kein geeigneter Ort für archäologische Geräte.",
          translation: "[The] main road is not an appropriate place for archaeological equipment.",
          hint: "[feminine]"
        },
      ]
    },

    // LEVEL 3
    {
      lines: [
        {
          from: "scientist",
          message: "[Die] Physik funktioniert, weil die Realität über die Zeit hinweg konsistent ist.",
          translation: "Physics works because reality is consistent through time.",
          hint: "[feminine]",
        },
        {
          from: "scientist",
          message: "Wir können [die] Zukunft vorhersagen, weil sie sich wie die Vergangenheit verhält.",
          translation: "We can predict [the] future because it behaves like the past.",
          hint: "[feminine]",
        },
        {
          from: "scientist",
          message: "Aber was passiert, wenn [die] Grundkonstanten nicht wirklich konstant sind? Meine Arbeit geht dieser Frage nach.",
          translation: "But what happens if [the] fundamental constants are not truly constant? My work explores this.",
          hint: "[feminine]",
        },
        {
          from: "reporter",
          message: "Warum sollte [der] Steuerzahler angesichts des Mangels an praktischen Anwendungen Ihre Studie finanzieren?",
          translation: "Why should [the] taxpayer fund your study, given the lack of practical applications?",
          hint: "[masculine]"
        },
        {
          from: "scientist",
          message: "Weil [die] Forschung ist verdammt cool ist!",
          translation: "Because [the] research is hecking cool!",
          hint: "[feminine]",
        },
      ]
    }
  ],
})
