import { faDna } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"
import lookingSquirrelImg from "$lib/img/lookingSquirrelImg.webp"
import forestSquirrelImg from "$lib/img/forestSquirrelImg.webp"
import serverImg from "$lib/img/serverImg.webp"
import carrotImg from "$lib/img/carrotImg.webp"

export default definePattern({
  id: "sein",
  slug: "sein",
  title: "Sein oder Nichtsein",
  shortdesc: "How to say stuff is or things are",
  icon: faDna,
  explanation: md`
One of the most common German verbs is _sein_, equivalent to the English "to be". "sein" is the infinitive or dictionary
form; you'll see it less often in practice than the conjugated forms, like _ich bin_ (I am) or _du bist_ (you are).

Like "to be", sein is an irregular verb, meaning it doesn't share a conjugation pattern with other verbs in the language.
It just does its own thing there. Fortunately, the different forms all show up so often that you'll come to remember them 
pretty quickly.

<LTable translate inlines header="Singular / Plural">
ich bin (I am) / wir sind (we are)
du bist (you are) / ihr seid (you are)
er ist (he is) / sie sind (they are)
sie ist (she is) / Sie sind (you are)
es ist (it is) / _
</LTable>

Unlike in English, which generally always uses _it_ for inanimate objects, German makes use of the noun gender so that 
everything has gendered pronouns. _er_, _sie_, or _es_ is used for masculine, feminine or neuter nouns respectively. 

<DialogueExample>
lindenbaum:
  **Der Planet** ist winzig. **Er ist** eine zerbrechliche, wertvolle Welt.
  **The planet** is tiny. **It is** a fragile, precious world.
squirrel:
  **Die Mandel** ist lecker. **Sie ist** eine köstliche Mandel.
  **The almond** is tasty. **It is** a delicious almond.
fox:
  **Das Meme** ist alt. **Es ist** ein uraltes Meme.
  **The meme** is old. **It is** an ancient meme.
</DialogueExample>

Note that _Sie sind_ (with the capital S) is special in that it can be both singular or plural (like English _you are_), 
and is the polite form used especially when talking with strangers. We'll learn more about it later in patterns on 
formal/informal language!
  `,

  story: [
    {
      from: "lukas",
      message: "Erkennst du die Kreatur auf dem Foto? Sie ist ein Eichhörnchen.",
      translation: "Do you recognize the creature in the photo? It is a squirrel.",
    },
    {
      from: "squirrel",
      message: "Sie ist mir ähnlich! Aber flach.",
      translation: "It is similar to me! But flat."
    },
    {
      question: `What is Töski referring to with "sie ist"?`,
      choices: [
        { text: "die Kreatur", correct: true },
        { text: "das Foto" }
      ]
    },
    {
      from: "lukas",
      message: "Oh, das Eichhörnchen ist nicht flach, nur das Foto, das es darstellt.",
      translation: "Oh, the squirrel is not flat, only the photo that represents it."
    },
    {
      from: "squirrel",
      message: "Nein, ich meine, das Eichhörnchen ist flach. Das ist Lukas auch!",
      translation: "No, I mean, the squirrel is flat. Lukas is flat too!"
    },
    {
      from: "squirrel",
      message: "Ich bin holpriger.",
      translation: "I am more bumpy."
    },
    {
      from: "squirrel",
      message: "Denkst du ich bin ein Eichhörnchen?",
      translation: "Do you think I am a squirrel?"
    },
    {
      from: "lukas",
      message: "Du bist wie ein Eichhörnchen geformt. Vielleicht konvergente Evolution?",
      translation: "You are shaped like a squirrel. Maybe convergent evolution?"
    }
  ],
  exercises: [
    {
      from: 'fox',
      type: 'choice',
      image: serverImg,
      message: `Wie bereit sehen die Systeme aus?`,
      translation: "How ready do the systems seem?`",
      hint: "plural, 3rd person",
      choices: [
        { text: "sie bin bereit", correct: false },
        { text: "sie ist bereit", correct: false },
        { text: "sie seid bereit", correct: false },
        { text: "sie sind bereit.", correct: true }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: forestSquirrelImg,
      message: `Wie sehe ich aus?`,
      translation: "How do I look?`",
      hint: "singular, 2nd person",
      choices: [
        { text: "du bist flauschig", correct: true },
        { text: "du ist flauschig", correct: false },
        { text: "du bin flauschig", correct: false },
        { text: "du seid flauschig.", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: lookingSquirrelImg,
      message: `Was für ein Tier bist du?`,
      translation: "What kind of animal are you?`",
      hint: "singular, 1st person",
      choices: [
        { text: "ich sind ein Mensch", correct: false },
        { text: "ich ist ein Mensch", correct: false },
        { text: "ich bin ein Mensch", correct: true },
        { text: "ich bist ein Mensch.", correct: false }
      ]
    },
    {
      from: 'cashier',
      type: 'choice',
      image: carrotImg,
      message: `Was haben Sie in dem Beutel?`,
      translation: "What do you have in the bag?`",
      hint: "plural, 3rd person",
      choices: [
        { text: "das ist Möhren", correct: false },
        { text: "das sind Möhren", correct: true },
        { text: "das seid Möhren", correct: false },
        { text: "das bin Möhren.", correct: false }
      ]
    },
    // {
    //   from: "squirrel",
    //   message: "Du [bist] sehr flach. Das ist irgendwie niedlich.",
    //   translation: "You [are] very flat. It's kind of cute."
    // },
    // {
    //   from: "lukas",
    //   message: "Er [ist] _holprig_? Was soll das bedeuten?",
    //   translation: "He [is] _bumpy_? What does that mean?"
    // },
    // {
    //   from: "lindenbaum",
    //   message: "Ich [bin] auf das Experiment vorbereitet.",
    //   translation: "I [am] prepared for the experiment."
    // },
    // {
    //   from: "fox",
    //   message: "Die vier Tafeln [sind] durchdacht angeordnet.",
    //   translation: "The four panels [are] thoughtfully arranged."
    // }
  ]
  // LEVEL 2
  // {
  //   lines: [
  //     {
  //       from: "harald",
  //       message: "[Sein] oder Nichtsein?",
  //       translation: "[To be] or not to be?"
  //     },
  //     {
  //       from: "harald",
  //       message: "Die Entscheidung [ist] mein!",
  //       translation: "The decision [is] mine!"
  //     },
  //     {
  //       from: "harald",
  //       message: "Denn [ich bin] der größte Ritter.",
  //       translation: "For [I am] the greatest knight.",
  //     },
  //     {
  //       from: "harald",
  //       message: "Doch Ihr [seid] die kleinste Leiter.",
  //       translation: "But you [are] the smallest ladder."
  //     },
  //     {
  //       from: "harald",
  //       message: "Denn [sie ist] die Leiter zum Erfolg.",
  //       translation: "For [it is] the ladder to success.",
  //     },
  //     {
  //       from: "harald",
  //       message: "So [bin] ich der größte Poet aller Zeiten.",
  //       translation: "Thus I [am] the greatest poet of all time."
  //     },
  //     {
  //       from: "klaus",
  //       message: "miep.",
  //       translation: "meep.",
  //     },
  //     {
  //       from: "harald",
  //       message: "Und du [bist] das kleinste Mäuschen.",
  //       translation: "And you [are] the smallest mouse.",
  //     },
  //     {
  //       from: "harald",
  //       message: "Und zusammen [sind] wir das perfekte Duo!",
  //       translation: "And together we [are] the perfect duo!",
  //     },
  //     {
  //       from: "klaus",
  //       message: "miep miep!",
  //       translation: "meep meep!.",
  //     },
  //     {
  //       from: "harald",
  //       message: "Ach du [bist] hungrig?",
  //       translation: "Oh you [are] hungry?",
  //     },
  //   ]
  // },
})
