import { faListOl } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "ein-eine",
  slug: "ein-eine",
  title: "Ein und eine",
  shortdesc: "Gendered variations of 'a'",
  icon: faListOl,
  explanation: md`
In English, we choose to use either _a_ or _an_ depending on the following word. Similarly, German switches between _ein_ or _eine_ depending on the grammatical gender of the noun being referred to.

<ltable header="Gender / Noun">
masculine / der Späher, ein Späher
feminine / die Barriere, eine Barriere
neuter / das Proton, ein Proton
</ltable>

Note that the masculine and neuter forms of ein are the same, unlike with der and das.

Words like mein (my) and dein (your) follow the same inflection pattern as ein/eine:

<ltable header="Deutsch / Meaning">
mein Proton / my proton
dein Proton / your proton
meine Barriere / my barrier
deine Barriere / your barrier
</ltable>
  `,
  exercises: [
    // LEVEL 1
    [
      {
        from: "lukas",
        message: "Woher kommt [ein] sprechendes Eichhörnchen?",
        translation: "Where does [a] talking squirrel come from?",
        hint: "[neuter]",
      },
      {
        from: "squirrel",
        message: "[Ein] Land weit weg von hier.",
        translation: "[A] land far away from here.",
        hint: "[masculine]",
      },
      {
        from: "squirrel",
        message: "[Deine] Welt ist sehr ruhig.",
        translation: "[Your] world is very quiet.",
        hint: "[feminine]",
      },
      {
        from: "squirrel",
        message: "[Meine] Leute würden es eine Todeszone nennen.",
        translation: "[My] people would call it a deadzone.",
      },
      {
        from: "squirrel",
        message: "Für mich ist es wie [ein] ruhiger Ozean.",
        translation: "To me it's like [a] calm ocean.",
        hint: "[masculine]",
      },
    ],
    // {
    //   from: "squirrel",
    //   message: "Es ist [ein] guter Ort, um sich zu verstecken.",
    //   translation: "It's [a] good place to hide.",
    //   hint: "[masculine]",
    // },
  ],
})
