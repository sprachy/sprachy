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

<DialogueExample>
lukas:
  Woher kommt **ein sprechendes Eichhörnchen**?
  Where does **a talking squirrel** come from?
squirrel:
  **Ein Land** weit weg von hier.
  **A land** far away from here.
squirrel:
  Kann ich **eine Mandel** haben?
  Can I have **an almond**?

</DialogueExample>

<ltable header="Gender / Noun">
masculine / =der Späher=, =ein Späher=
feminine / =die Barriere=, =eine Barriere=
neuter / =das Proton=, =ein Proton=
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
        message: "Warum bist du in [meine] Welt gekommen?",
        translation: "Why did you come to [my] world?",
        hint: "[feminine]",
      },
      {
        from: "squirrel",
        message: "[Dein] Universum ist sehr ruhig.",
        translation: "[Your] universe is very quiet.",
        hint: "[neuter]",
      },
      {
        from: "squirrel",
        message: "[Meine] Leute nennen es eine Toteszone.",
        translation: "[My] people call it a deadzone.",
        hint: "[plural]",
      },
      {
        from: "squirrel",
        message: "Es ist [ein] guter Ort, um sich zu verstecken.",
        translation: "It's [a] good place to hide.",
        hint: "[masculine]",
      },
    ],
  ],
})
