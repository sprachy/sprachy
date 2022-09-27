import { definePattern, md } from "$lib/definePattern"

// https://german.stackexchange.com/questions/3834/what-is-the-gender-distribution-of-nouns-in-the-german-language
export default definePattern({
  id: "onboarding",
  slug: "onboarding",
  title: "Onboarding",
  shortdesc: "",
  hidden: true,
  explanation: md`
  `,
  story: [
    {
      from: "lukas",
      message: "Willkommen bei Sprachy!",
      translation: "Welcome to Sprachy!"
    },
    {
      from: "lukas",
      message: "This is a guided course for learning German."
    },
    {
      from: "lukas",
      message: "Sprachy teaches German through little dialogues, and tells a story along the way."
    },
    {
      from: "lukas",
      message: "After each dialogue, we'll go over a new pattern of language that the speakers used."
    },
    {
      from: "lukas",
      message: "Then we practice that pattern with some exercises."
    },
    {
      from: "lukas",
      message: "Sollen wir anfangen?",
      translation: "Shall we begin?"
    }
  ],
  exercises: []
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