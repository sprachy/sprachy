import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

// TODO: Probably some interesting social subtleties about gender that are worth discussing here (non-binary people?)

export default definePattern({
  id: 'der-lerner-die-lernerin',
  slug: 'der-lerner-die-lernerin',
  title: "Der Lerner, die Lernerin",
  shortdesc: "Grammatical gender and people",
  icon: faVenusMars,
  explanation: md`
How does grammatical gender interact with the actual gender of individual humans? Often, a noun that refers to a type of person will have both a masculine and a feminine form.

<ltable header="Masculine / Feminine / Meaning">
der Mann / die Frau / the man/woman
der Student / die Studentin / the university student
der Arzt / die Ärztin / the doctor
der Paläoastrobiologe / die Paläoastrobiologin / the paleoastrobiologist
</ltable>

Pretty straightforward! Not all person words follow this pattern, though. For example, _das Mädchen_ is always neuter as a _-chen_ word, even though it refers specifically to girls. Similarly, _die Person_ and _der Mensch_ are feminine and masculine respectively, even though they both just refer to people in general.
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