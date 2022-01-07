import { faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

// TODO: Probably some interesting social subtleties about gender that are worth discussing here (non-binary people?)

export default definePattern({
  id: "der-lerner-die-lernerin",
  slug: "der-lerner-die-lernerin",
  title: "Der Lerner, die Lernerin",
  shortdesc: "Grammatical gender and people",
  icon: faVenusMars,
  explanation: md`
How does grammatical gender interact with the actual gender of individual ~~humans~~ sapient entities? Often, a noun that refers to a type of person will have both a masculine and a feminine form.

<ltable header="Masculine / Feminine / Meaning">
der Mann / die Frau / the man/woman
der Student / die Studentin / the university student
der Arzt / die Ärztin / the doctor
der Paläoastrobiologe / die Paläoastrobiologin / the paleoastrobiologist
</ltable>

Pretty straightforward! Not all person words follow this pattern, though. For example, _das Mädchen_ is always neuter as a _-chen_ word, even though it refers specifically to girls. Similarly, _die Person_ and _der Mensch_ are feminine and masculine respectively, even though they both just refer to people in general.


  `,
  stories: [
    // LEVEL 1
    {
      lines: [
        {
          from: "squirrel",
          message: "Lukas, bist du [ein] Student?",
          translation: "Lukas, are you [a] uni student?",
        },
        {
          from: "lukas",
          message: "Ja. [Meine] Biologieprofessorin würde Sie gerne mal sehen.",
          translation:
            "Yes. [My] biology professor would love to get a look at you.",
        },
        {
          from: "lukas",
          message: "Was bist du auf deiner Welt?",
          translation: "What are you on your world?",
        },
        {
          from: "squirrel",
          message: "Etwas wie... [ein] Prinz?",
          translation: "Something like... [a] prince?",
        },
        {
          from: "squirrel",
          message:
            "[Die] Buchhalterin war nicht sehr glücklich darüber, dass ich gegangen bin.",
          translation: "[The] accountant was not very happy I left.",
        },

        // {
        //   from: "squirrel",
        //   message: "Ist [deine] Schwester auch eine Studentin?",
        //   translation: "Is [your] sister also a uni student?",
        // },
        // {
        //   from: "lukas",
        //   message: "Nein, sie ist [eine] Gymnasiastin.",
        //   translation: "No, she is still [a] high school student.",
        // },
      ],
    }
  ],
})
