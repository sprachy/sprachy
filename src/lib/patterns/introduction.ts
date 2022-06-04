import { faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

// https://german.stackexchange.com/questions/3834/what-is-the-gender-distribution-of-nouns-in-the-german-language
export default definePattern({
  id: "introduction",
  slug: "introduction",
  title: "Introduction",
  shortdesc: "Ah yes, the three genders",
  icon: faVenusMars,
  explanation: md`
Der, die, and das are three ways of saying _the_ in German. Which one you use depends on the _grammatical gender_ of the noun that follows.

<LTable header="Gender / Deutsch / Meaning">
neuter / **das** Eichhörnchen / **the** squirrel
masculine / **der** Baum / **the** tree
feminine / **die** unendliche Leere / **the** infinite void
</LTable>

These are all in what's called the _nominative case_, the case where we're talking about the subject of a sentence (like a squirrel), unmodified by any verbs.

The gender of a particular noun usually has nothing to do with what that word describes. It's not that trees are particularly manly, or that ominous voids are particularly girly. That's simply the _grammatical_ gender those nouns happen to have, by consensus of German speakers.

Generally, you want to learn the gender together with the word. Rather than remembering that _Baum_ means tree, try to remember _der Baum_! However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.

Roughly speaking, around 40% of nouns are masculine, 40% are feminine, and 20% are neuter. A very small number of words have more than one gender. They're fancy and rare like shiny Pokémon!

<DialogueExample>
squirrel:
  Aber **die** Plurale!
  But **the** plurals!
</DialogueExample>

For plurals, we always use _die_, regardless of the noun's base gender. For example, _der Baum_ would become _die Bäume_ when talking about mulitiple trees. Meanwhile, _das_ when used without a noun can also have the meaning of "that" or "it".

<Tip>
Unlike in English, the first letter of every noun in German is **C**apitalized. This is particularly useful when learning the language, as it makes nouns easy to identify.
</Tip>
  `,
  story: [
    {
      from: "narrator",
      message: "Ein Junge spaziert im Park.",
      translation: "A boy is walking in the park."
    },
    {
      from: "narrator",
      message: "Er sieht ein süßes Eichhörnchen. 🐿️",
      translation: "He sees a cute squirrel."
    },
    {
      from: "narrator",
      message: "Ein Junge spaziert im Park."
    },
    {
      from: "lukas",
      message: "Hallo, kleines Eichhörnchen.",
    },
    {
      from: "squirrel",
      message: "Dieser Baum ist sehr gemütlich.",
      alien: true
    },
    {
      from: "squirrel",
      message: "Hallo. [Der] Baum hier ist gemütlich.",
      translation: "Hello. [The] tree here is comfy.",
      hint: "[masculine]",
    },
    {
      from: "lukas",
      message: "Und jetzt... spricht [das] Eichhörnchen mit mir?",
      translation: "And now... [the] squirrel is talking to me?",
      hint: "[neuter]",
    },
    {
      from: "squirrel",
      message: "[Die] Nüsse hier sind auch sehr lecker.",
      translation: "[The] nuts here are also very tasty.",
    },
    {
      from: "lukas",
      message: "[Der] Tag wurde definitiv merkwürdiger!",
      translation: "[The] day definitely got weirder!",
      hint: "[masculine]"
    },
    {
      from: "squirrel",
      message: "Nun, [der] Mensch flippt nicht aus. Das ist schon mal ein guter Anfang.",
      translation: "Well, [the] human isn't freaking out. That's a good start.",
      hint: "[masculine]"
    },
    {
      from: "lukas",
      message: "Ich habe _so viele_ Fragen.",
      translation: "I have _so many_ questions."
    },
    {
      from: "squirrel",
      message: "[Die] Fragen... Ich werde einige beantworten, wenn ihr mir helft, meine Anwesenheit geheim zu halten.",
      translation: "[The] questions... I will answer some, if you help keep my presence secret."
    },
    {
      from: "lukas",
      message: "Abgemacht!",
      translation: "Deal!"
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