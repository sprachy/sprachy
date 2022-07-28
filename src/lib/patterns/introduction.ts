import { definePattern, md } from "$lib/definePattern"
import parkImg from "$lib/img/1-park.webp"
import orbInParkImg from "$lib/img/1-orb-in-park.webp"
import squirrelOnTreeImg from "$lib/img/1-squirrel-on-tree.webp"
import squirrelImg from "$lib/img/squirrel.webp"

// https://german.stackexchange.com/questions/3834/what-is-the-gender-distribution-of-nouns-in-the-german-language
export default definePattern({
  id: "introduction",
  slug: "introduction",
  title: "Introduction",
  shortdesc: "Ah yes, the three genders",
  draft: true,
  explanation: md`
  `,
  story: [
    {
      from: "narrator",
      message: "Es ist ein ruhiger Tag in Deutschland.",
      translation: "It is a peaceful day in Germany.",
    },
    {
      from: "narrator",
      message: "Die Blätter flattern in der Frühlingsbrise.",
      translation: "The leaves flutter in the spring breeze.",
      image: parkImg,
      imageAlt: "A picture of pretty green trees"
    },
    {
      from: "narrator",
      message: "Eine mysteriöse Kugel sitzt im Baum.",
      translation: "A mysterious orb sits in the tree.",
      image: orbInParkImg,
      imageAlt: "A mysterious featureless white orb hovering above a leaf"
    },
    {
      question: `Was bedeutet "Kugel"?`,
      translation: "What does \"Kugel\" mean?",
      choices: [
        { text: "cube" },
        { text: "orb", correct: true },
        { text: "tail" },
        { text: "hat" },
      ]
    },
    {
      from: "narrator",
      message: "Die Kugel denkt.",
      translation: "The orb thinks.",
    },
    {
      from: "orb",
      message: "Ich bin da!",
      translation: "I have arrived!"
    },
    {
      from: "orb",
      message: "Diese Welt ist sehr grün.",
      translation: "This world is very green."
    },
    {
      from: "narrator",
      message: "Die Kugel sieht Bewegung in den Blättern.",
      translation: "The orb sees movement in the leaves.",
    },
    {
      from: "narrator",
      message: "Es ist ein Eichhörnchen!",
      translation: "It is a squirrel!",
      image: squirrelOnTreeImg,
      imageAlt: "A squirrel climbing a tree"
    },
    {
      from: "orb",
      message: "Das gefällt mir!",
      translation: "I like it!",
    },
    {
      from: "orb",
      message: "Zeit für Entdeckungen.",
      translation: "Time for exploring.",
      effect: {
        type: 'transformAvatar',
        target: squirrelImg
      }
    }
  ],
  exercises: [
    {
      from: "squirrel",
      message: "[Die] Cashew ist auf eine höhere Ebene aufgestiegen.",
      translation: "[The] cashew has ascended to a higher plane.",
      hint: "[feminine]"
    },
    {
      from: "lukas",
      message: "[Die] außerirdische Lebensform ist niedlich.",
      translation: "[The] alien lifeform is cute.",
      hint: "[feminine]"
    },
    {
      from: "lindenbaum",
      message: "[Das] Universum ist größer als wir wissen.",
      translation: "[The] universe is vaster than we know.",
      hint: "[neuter]"
    },
    {
      from: "fox",
      message: "[Der] Shiba Inu ist ironisch.",
      translation: "[The] Shiba Inu is ironic.",
      hint: "[masculine]"
    }
  ]
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