import { faUserTie } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "du-oder-sie",
  slug: "formal",
  title: "Du oder Sie",
  shortdesc: "How to not be an overly familiar rando",
  icon: faUserTie,
  explanation: md`
German has different ways to say _you_ depending on who you're talking to. In casual conversation, like with friends or family, you can use _du_. When talking to strangers or authority figures, it's common to use _Sie_ instead.

<ltable header="Deutsch / Meaning">
Du bist sehr süß / You are very cute (informal)
Sie sind eine brillante Wissenschaftlerin / You are a brilliant scientist (formal)
</ltable>

Note that _Sie_ when capitalized means the formal you, but the lowercase _sie_ also means "they" or "she". Don't get them mixed up!

<ltable header="Deutsch / Meaning">
Ja, Sie sind richtig / Yes, you are right (formal)
Nein, sie sind keine Kamele / No, they are not camels
Vorsicht, sie ist eine furchtbare Feindin / Beware, she is a fearsome enemy
</ltable>

Similar to "they" in English, the singular _Sie_ and plural _sie_ both use _Sie sind_ like "they are". The "she" meaning of sie uses _sie ist_. This sind/ist difference, along with the casing, can help you figure out from context which of the three meanings is being used.

<DialogueExample>
cashier:
  Ist das Ihr Eichhörnchen, Sir?
  Is that your squirrel, sir?
</DialogueExample>

Note that all three forms of sie/Sie change to ihr/Ihr for the possessive!
  `,
  story: [
    {
      from: "cashier",
      message: "Möchten [Sie] noch etwas anderes?",
      translation: "Would [you] like anything else?",
      hint: "[formal]",
      // feedback: {
      //   "du": "_du_ is the the informal form. You want the formal one."
      // }
    },
    {
      from: "squirrel",
      message: "Lukas, [du] musst die mit Honig gebrannten Mandeln kaufen!",
      translation: "Lukas, [you] have to get the honey-roasted almonds!",
      hint: "[informal]",
    },
    {
      from: "cashier",
      message: "Entschuldigung, spricht [Ihr] Rucksack?",
      translation: "Excuse me, is [your] backpack talking?",
      hint: "[masculine]",
    },
    {
      from: "lukas",
      message: "Pssst. [Du] wirst die Menschen verängstigen.",
      translation: "Shhhh. [You]'ll freak out the humans.",
      hint: "[informal]",
    },
    {
      from: "lukas",
      message: "Können [Sie] mir sagen, welche Art von Mandeln Sie haben?",
      translation: "Could [you] tell me what kind of almonds you have?",
      hint: "[formal]",
    },
  ],
  exercises: [
    {
      from: "squirrel",
      message: "Entschuldigung, kennen [Sie] den Weg zur Erde?",
      translation: "Excuse me, do [you] know the way to Earth?",
      feedback: {
        "du": "If it were the informal **du**, then we'd see **kennst** instead of **kennen**."
      }
    },
    {
      from: "lukas",
      message: "Mein Rucksack hat ein Geräusch gemacht? Tut mir leid, da müssen [Sie] sich irren.",
      translation: "My backpack made a noise? Sorry, [you] must be mistaken.",
      feedback: {
        "du": "If it were the informal **du**, then we'd see **musst** instead of **müssen**."
      }
    },
    {
      from: "fox",
      message: "Entschuldigen Sie, ist das [Ihre] Regenbogenkatze?",
      translation: "Excuse me, is this [your] rainbow cat?",
      feedback: {
        "Ihr": "That's the masculine or neuter form. Because **katze** is feminine, you want the feminine form.",
        "deine": "That's the informal form. Because the speaker used **Sie**, we know they're speaking formally."
      }
    },
    {
      from: "cashier",
      message: "Möchten [Sie] dazu Pommes frites?",
      translation: "Would [you] like fries with that?",
      feedback: {
        du: "If it were the informal **du**, then we'd see **möchtest** instead of **möchten**."
      }
    },
  ]
})


    // // LEVEL 1
    // {
    //   lines: [
    //     {
    //       from: "lindenbaum",
    //       message: "Haben [Sie] manchmal das Gefühl, dass es der Menschheit an Ehrgeiz fehlt?",
    //       translation: "Do [you] ever feel like humanity lacks ambition?",
    //       hint: "[formal]"
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "[Sie] sind ein funkelndes Juwel der Selbsterkenntnis in einem Universum voller Leere.",
    //       translation: "[You] are a sparkling jewel of self-awareness in a universe filled with void."
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "Und doch vergeuden wir [Ihre] Talente mit der Arbeit einer Maschine.",
    //       translation: "Yet we waste [your] talents doing the work of a machine."
    //     },
    //     {
    //       from: "cashier",
    //       message: "Äh... haben [Sie] eine Bonuskarte?",
    //       translation: "Er... do [you] have a rewards card?"
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "*seufz*",
    //       translation: "*sigh*"
    //     }
    //   ],
    // }