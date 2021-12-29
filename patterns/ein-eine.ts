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

<LTable translate header="Gender / The Noun / A Noun">
masculine / der Ort / ein Ort
feminine / die Welt / eine Welt
neuter / das Eichhörnchen / ein Eichhörnchen
</LTable>

Note that the masculine and neuter forms of ein are the same, unlike with der and das!

<DialogueExample>
fish:
  Der Ozean ist **mein** Ozean!
  The ocean is **my** ocean!
</DialogueExample>

There are several other "ein-style" words that follow the same gendered inflection pattern as ein/eine. Keep their different meanings in mind!

<LTable translate header="Noun / Mein / Dein / Sein / Kein">
der Ozean / mein Ozean / dein Ozean / sein Ozean / kein Ozean
die Krabbe / meine Krabbe / deine Krabbe / seine Krabbe / keine Krabbe
das Problem / mein Problem / dein Problem / sein Problem / kein Problem
</LTable>

<Tip title="Deine Plurale">
It makes no sense to say "eine Plurale" (an plurals), but words like _meine_ or _keine_ can be used for plurals. Like with _die Plurale_, they follow the feminine form, regardless of the noun's original gender.
</Tip>
  `,
  stories: [
    // LEVEL 1
    {
      lines: [
        {
          from: "lukas",
          message: "Woher kommt [ein] sprechendes Eichhörnchen?",
          translation: "Where does [a] talking squirrel come from?",
          // hint: "[neuter]",
        },
        {
          from: "squirrel",
          message: "[Ein] Ort weit weg von hier.",
          translation: "[A] place far away from here.",
          // hint: "[masculine]",
        },
        {
          from: "squirrel",
          message: "[Deine] Welt ist sehr ruhig.",
          translation: "[Your] world is very quiet.",
          // hint: "[feminine]",
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
          // hint: "[masculine]",
        },
      ]

      // LEVEL 2
    }
  ],
  // {
  //   from: "squirrel",
  //   message: "Es ist [ein] guter Ort, um sich zu verstecken.",
  //   translation: "It's [a] good place to hide.",
  //   hint: "[masculine]",
  // },
})
