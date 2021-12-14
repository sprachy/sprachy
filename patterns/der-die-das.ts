import { faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "der-die-das",
  slug: "der-die-das",
  title: "Der, die, das",
  shortdesc: "Ah yes, the three genders",
  icon: faVenusMars,
  explanation: md`
Der, die, and das are the three ways of saying _the_ in German. Which one you use depends on the grammatical gender of the noun that follows.

<DialogueExample>
squirrel:
  Hallo, Mensch. **Der Baum** hier ist gemütlich.
  Hello, human. **The tree** here is comfy.
squirrel:
  **Die Leere** empfiehlt diesen Baum sehr.
  **The void** recommends this tree highly.
lukas:
  **Das Eichhörnchen**... redet mit mir?
  **The squirrel** is... talking to me?
</DialogueExample>

Here we can see the noun _Baum_ uses the masculine "der", _Leere_ is the feminine "die", and _Eichhörnchen_ uses the neuter form "das".

There's no thematic or aesthetic reason for this; it's not that trees are particularly manly, or that terrifying voids are particularly girly. That's simply the _grammatical_ gender those nouns happen to have.

However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.

<Tip title="Die Plurale">
For plurals, we always use _die_, regardless of the noun's base gender. For example, _der Baum_ becomes _die Bäume_ when talking about mulitiple trees.
</Tip>
  `,
  exercises: [
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
    [
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
      {
        from: "lukas",
        message: "[Das] ist... gut zu wissen.",
        translation: "[That] is... good to know.",
      },
    ],

    // LEVEL 2
    // {
    //   from: "scientist",
    //   message: "[Die] Barriere wird schwächer!",
    //   translation: "[The] barrier is weakening!",
    //   hint: "[feminine]",
    // },
    // {
    //   from: "deer",
    //   message: "Ist [der] Späher vorbereitet?",
    //   translation: "Is [the] scout prepared?",
    //   hint: "[masculine]",
    // },
    // {
    //   from: "scientist",
    //   message: "Sie werden in Kürze [das] erste Proton sehen.",
    //   translation: "You will see [the] first proton momentarily.",
    //   hint: "[neuter]",
    // },
  ],
})
