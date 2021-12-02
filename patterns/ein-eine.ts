import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'ein-eine',
  slug: 'ein-eine',
  title: "Ein und eine",
  shortdesc: "Gendered variations of 'a'",
  icon: faListOl,
  explanation: md`
In English, we choose to use either _a_ or _an_ depending on the following word. Similarly, German switches between =ein= and =eine= depending on the grammatical gender of the noun being referred to.

<ltable header="Gender / Noun">
masculine / =der Späher=, =ein Späher=
feminine / =die Barriere=, =eine Barriere=
neuter / =das Proton=, =ein Proton=
</ltable>

Note that the masculine and neuter forms of ein are the same, unlike with der and das.

Various other words follow the same inflection pattern as ein/eine:

<ltable header="Deutsch / Meaning">
ein Proton / a proton
mein Proton / my proton
dein Proton / your proton
eine Barriere / a barrier
meine Barriere / my barrier
deine Barriere / your barrier
</ltable>
`,
  exercises: [
    // {
    //   from: 'scientist',
    //   message: '[Die] Barriere wird schwächer!',
    //   translation: '[The] barrier is weakening!',
    //   hint: "[feminine]"
    // },
    // {
    //   from: 'deer',
    //   message: 'Ist [der] Späher vorbereitet?',
    //   translation: 'Is [the] scout prepared?',
    //   hint: "[masculine]"
    // },
    // {
    //   from: 'scientist',
    //   message: 'Sie werden in Kürze [das] erste Proton sehen.',
    //   translation: 'You will see [the] first proton momentarily.',
    //   hint: "[neuter]"
    // },
  ]
})