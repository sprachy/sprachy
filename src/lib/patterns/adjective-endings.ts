import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "adjective-endings",
  slug: "adjective-endings",
  title: "Adjective endings",
  shortdesc: "",
  icon: faExclamation,
  draft: true,
  explanation: md`
Consider the difference between these two phrases:

<DialogueExample>
lukas:
  Das Eichhörnchen und der starke Kaffee vertragen sich nicht.
  The squirrel and the strong coffee don't mix.
</DialogueExample>

<DialogueExample>
lukas:
  Eichhörnchen und starke**r** Kaffee vertragen sich nicht.
  Squirrels and strong coffee don't mix.
</DialogueExample>

Notice how an **r** gets added to the adjective in the second example? Because there is no _der_, the adjective _starke_ becomes _starker_ to indicate the gender of the masculine noun _Kaffee_.

The general pattern is: when there is no _der-_ or _ein-_ type word preceding a noun, it is instead the adjective that changes form to indicate gender and case.

<LTable>
_ / Masculine / Feminine / Neuter / Plural
Nominative / weicher Flaum /	frische Milch	/ flauschiges Eichhörnchen / rote Weine
Accusative / weichen Flaum / frische Milch	/ flauschiges Eichhörnchen	/ rote Weine
Dative / weichem Flaum	/ frischer Milch / flauschigem Eichhörnchen / roten Weinen
Genitive / weichen Flaumes /	frischer Milch / kalten Bieres	/ roter Weine
</LTable>
`
  ,
  story: [{
    from: "squirrel",
    message: ""
  }],
  exercises: [
    // {
    //   from: "squirrel",
    //   message: "[Mach] deinen Zug, Mensch!",
    //   translation: "[Make] your move, human!",
    //   hint: "[machen]",
    //   explanation: `This is a command for someone to do something, so it's imperative form. Verbs in imperative form tend to use their stem form with no prefix or suffix, so _machen_ becomes _mach_.`
    // },
  ]
})