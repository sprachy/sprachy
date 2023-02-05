import { definePattern, md } from "~/lib/definePattern"
import parkImg from "~/assets/1-park.webp"
import orbInParkImg from "~/assets/1-orb-in-park.webp"
import squirrelOnTreeImg from "~/assets/1-squirrel-on-tree.webp"
import fishImg from "~/assets/intro-fish.webp"
import catImg from "~/assets/intro-cat.webp"
import elephantImg from "~/assets/intro-elephant.webp"
import foxImg from "~/assets/intro-fox.webp"


// https://german.stackexchange.com/questions/3834/what-is-the-gender-distribution-of-nouns-in-the-german-language
export default definePattern({
  id: "introduction",
  slug: "introduction",
  title: "Learning German",
  shortdesc: "",
  explanation: md`
German and English are both Germanic languages and closely related to each other. Since they share the majority of their alphabets with similar pronunciation rules, it's easy for an English speaker to start learning German!

There are only a few key differences from English at the typographic level.

- German has three more vowels: ä, ö and ü. The little hat is called an _umlaut_.
- The additional letter ß known as the Eszett or "sharp S".
- Nouns in German are always written with a **C**apital.

Much German vocabulary will also be recognizable to English speakers. Consider phrases like _der grüne Apfel_ (the green apple) or _die graue Maus_ (the gray mouse). This is increasingly true as the languages continue to borrow new words from each other, as in _das Baby_ or _der Computer_.

<DialogueExample>
squirrel:
  Diese Welt ist sehr grün.
</DialogueExample>

Sprachy exercises will often ask you to make a reasonable guess at the meaning of things when it's possible to do so!
`,
  storyTitle: "Töski",
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
      image: squirrelOnTreeImg,
      imageAlt: "A squirrel climbing a tree"
    },
    {
      from: "narrator",
      message: "Es ist ein Eichhörnchen!",
      translation: "It is a squirrel!",
    },
    {
      from: "orb",
      message: "Diese Form gefällt mir!",
      translation: "I like this form!",
    },
    {
      from: "orb",
      message: "Zeit für Entdeckungen.",
      translation: "Time for exploring.",
      special: 'morph'
    }
  ],
  exercises: [
    {
      from: 'squirrel',
      type: 'choice',
      image: fishImg,
      message: `Was ist dieser schwimmende Oval?`,
      translation: "What is this swimming oval?",
      choices: [
        { text: "ein Wombat", correct: false },
        { text: "eine Melone", correct: false },
        { text: "ein Fisch", correct: true },
        { text: "ein Hut", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: catImg,
      message: `Was ist dieses gefährliche Raubtier?`,
      translation: "What is this dangerous predator?",
      choices: [
        { text: "ein Wombat", correct: false },
        { text: "eine Katze", correct: true },
        { text: "ein Fisch", correct: false },
        { text: "eine Banane", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: foxImg,
      message: `Was ist diese listige Kreatur?`,
      translation: "What is this crafty creature?",
      choices: [
        { text: "ein Fuchs", correct: true },
        { text: "eine Katze", correct: false },
        { text: "eine Melone", correct: false },
        { text: "ein Opossum", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: elephantImg,
      message: `Was ist dieser großer Stampfer?`,
      translation: "What is this big stomper?",
      choices: [
        { text: "ein Hund", correct: false },
        { text: "ein Opossum", correct: false },
        { text: "eine Banane", correct: false },
        { text: "ein Elefant", correct: true },
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: squirrelOnTreeImg,
      message: `Was ist dieses herzerweichende, flauschige Geschöpf?`,
      translation: 'What is this heart-melting fluffy creature?',
      choices: [
        // {
        //   text: "ein Eichhörnchen",
        //   correct: true,
        //   feedback: "Ja! Das ist ein flauschige Eichhörnchen!",
        //   feedbackTranslation: "Yes! That is a fluffy squirrel!"
        // },
        { text: "ein Eichhörnchen", correct: true },
        { text: "ein Fisch", correct: false },
        { text: "ein Wombat", correct: false },
        { text: "ein Elefant", correct: false }
      ]
    },
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