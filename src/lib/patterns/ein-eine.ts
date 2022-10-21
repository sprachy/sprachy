import { faListOl } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"
import groceryBagImg from "$lib/img/groceryBagImg.webp"
import duckScratchImg from "$lib/img/duckScratchingImg.webp"
import tropicalGardenImg from "$lib/img/tropicalGardenImg.webp"
import duckCityImg from "$lib/img/duckCityImg.webp"

export default definePattern({
  id: "ein-eine",
  slug: "ein-words",
  title: "Ein und eine",
  shortdesc: "Like a/an but with more gender",
  icon: faListOl,
  explanation: md`
In English, we choose to use either _a_ or _an_ depending on the following word. Similarly, German switches between _ein_ or _eine_ depending on the grammatical gender of the noun being referred to.

<LTable translate header="Gender / The Noun / A Noun">
masculine / der Ort / ein Ort
feminine / die Welt / eine Welt
neuter / das Eichhörnchen / ein Eichhörnchen
</LTable>

Note that the masculine and neuter forms of ein are the same, unlike with der and das!

<DialogueExample>
fish:
  Der Ozean ist **mein** Ozean!
  The ocean is **my** ocean!
</DialogueExample>

There are several other "ein-style" words that follow the same gendered inflection pattern as ein/eine. Keep their different meanings in mind!

<LTable translate header="Noun / Mein / Dein / Sein / Kein">
der Ozean / mein Ozean / dein Ozean / sein Ozean / kein Ozean
die Krabbe / meine Krabbe / deine Krabbe / seine Krabbe / keine Krabbe
das Problem / mein Problem / dein Problem / sein Problem / kein Problem
</LTable>

<Tip title="Deine Plurale">
It makes no sense to say "eine Plurale" (an plurals), but words like _meine_ or _keine_ can be used for plurals. Like with _die Plurale_, they follow the feminine form, regardless of the noun's original gender.
</Tip>

<Tip title="Compound words">
When dealing with compound words, the last word within the compound word would define the gender of the noun. For instance the noun _Spiegelei_ includes the words _Spiegel_ (masculine) and _Ei_ (neuter), so in this case the ending-word of _Ei_ would be definining gender for Spiegelei.
</Tip>
  `,
  story: [
    // LEVEL 1
    {
      from: "lukas",
      message: "Woher kommt ein sprechendes Eichhörnchen?",
      translation: "Where does a talking squirrel come from?",
    },
    {
      from: "squirrel",
      message: "Ein Ort weit weg von hier.",
      translation: "A place far away from here."
    },
    {
      from: "squirrel",
      message: "Deine Welt ist sehr ruhig.",
      translation: "Your world is very quiet."
    },
    {
      from: "squirrel",
      message: "Meine Leute würden es eine Todeszone nennen.",
      translation: "My people would call it a deadzone."
    },
    {
      question: `What grammatical gender does "die Todeszone" have?`,
      choices: [
        { text: "neuter" },
        { text: "masculine" },
        { text: "feminine", correct: true }
      ]
    },
    {
      from: "squirrel",
      message: "Für mich ist es wie ein ruhiger Ozean.",
      translation: "To me it's like a calm ocean."
    },
  ],
  exercises: [
    {
      from: 'squirrel',
      type: 'choice',
      image: duckScratchImg,
      message: `Was kratzt es?`,
      translation: "What is it scratching?",
      hint: "accusative",
      choices: [
        { text: "**seine** Rücken", correct: false },
        { text: "**dein** Rücken", correct: false },
        { text: "**deine** Rücken", correct: false },
        { text: "**seinen** Rücken", correct: true }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: duckCityImg,
      message: `Auf was schauen die Enten?`,
      translation: "What are the ducks looking at?",
      hint: "feminine",
      choices: [
        { text: "auf **keine** Stadt", correct: false },
        { text: "auf **keine** Städte", correct: false },
        { text: "auf **eine** Stadt", correct: true },
        { text: "auf **ein** Stadt", correct: false }
      ]
    },
    {
      from: 'cashier',
      type: 'choice',
      image: groceryBagImg,
      message: `Wessen Einkaufstasche ist das?`,
      translation: "Whose grocery bag is this?",
      hint: "feminine",
      choices: [
        { text: "das ist **meine** Einkaufstasche", correct: true },
        { text: "das ist **mein** Einkaufstasche", correct: false },
        { text: "das ist **eine** Einkaufstasche", correct: false },
        { text: "das ist **ein** Einkaufstasche", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: tropicalGardenImg,
      message: `Wie viele Eichhörnchen gibt es dort?`,
      translation: "How many squirrels are there?",
      hint: "plural",
      choices: [
        { text: "es gibt **keine** Eichhörnchen", correct: true },
        { text: "es gibt **meine** Eichhörnchen", correct: false },
        { text: "es gibt **kein** Eichhörnchen", correct: false },
        { text: "es gibt **mein** Eichhörnchen", correct: true }
      ]
    },
    // {
    //   from: "squirrel",
    //   message: `Was bedeutet es, wenn mich [ein] Mensch "flauschig" nennt?`,
    //   translation: `What does it mean when [a] human calls me "fluffy"?`,
    //   hint: "[masculine]"
    // },
    // {
    //   from: "lukas",
    //   message: "[Eine] flauschige Textur lässt das Herz vor Sanftheit singen.",
    //   translation: "[A] fluffy texture makes the heart sing from softness.",
    //   hint: "[feminine]"
    // },
    // {
    //   from: "lindenbaum",
    //   message: "Das atomares Modell ist nur [eine] Abstraktion der quantenphysikalischen Realität.",
    //   translation: "The atomic model is only [an] abstraction of quantum physical reality.",
    //   hint: "[feminine]"
    // },
    // {
    //   from: "fox",
    //   message: "Warum sind [seine] Frösche so deprimiert?",
    //   translation: "Why are [his] frogs so depressed?"
    // }
  ]
})


    // LEVEL 2
    // {
    //   lines: [
    //     {
    //       from: "robot",
    //       message: "[Ein] organischer Mitbürger wird Ihren Fall beurteilen.",
    //       translation: "[An] organic peer will judge your case.",
    //       hint: "[masculine]",
    //     },
    //     {
    //       from: "explorer",
    //       message: "Organisch? Es gibt hier [keine] Menschen mehr.",
    //       translation: "Organic? There are [no] people left here."
    //     },
    //     {
    //       from: "explorer",
    //       message: "Ist das [ein] Aquarium?",
    //       translation: "Is that [an] aquarium?",
    //       hint: "[neuter]"
    //     },
    //     {
    //       from: "robot",
    //       message: "[Ein] organisches Jurymitglied wurde gefunden.",
    //       translation: "[An] organic jury member has been located.",
    //       hint: "[neuter]",
    //     },
    //     {
    //       from: "fish",
    //       message: "*blub*",
    //       translation: "*blub*",
    //     },
    //   ]
    // },

    // // LEVEL 3
    // {
    //   lines: [
    //     {
    //       from: "leonie",
    //       message: "Hallo Nils. Wie war [dein] Flug?",
    //       translation: "Hello Nils. How was [your] flight?",
    //       hint: "[masculine]",
    //     },
    //     {
    //       from: "nils",
    //       message: "Es war aufregend! Da war [eine] riesiger Zikade!",
    //       translation: "It was exciting! There was [a] huge cicada!",
    //       hint: "[feminine]"
    //     },
    //     {
    //       from: "leonie",
    //       message: "Eine riesige Zikade? Hat es [ein] hackendes Geräusch gemacht?",
    //       translation: "A huge cicada? Did it make a chopping noise?",
    //       hint: "[neuter]"
    //     },
    //     {
    //       from: "nils",
    //       message: "Ja, das! Aber [meine] Mutter hat gesagt, ich darf nicht damit spielen.",
    //       translation: "Yes, that! But [my] mother said I can't play with it."
    //     },
    //     {
    //       from: "leonie",
    //       message: "Das war [ein] Hubschrauber, Nils. Sie sind nicht sehr verspielt.",
    //       translation: "That was [a] helicopter, Nils. They're not very playful.",
    //       hint: "[masculine]"
    //     }
    //   ]
    // }
