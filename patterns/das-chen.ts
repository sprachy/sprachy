import { faCat } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "~/lib/definePattern"
import kätzchen from "~/assets/kätzchen.webp"
import brötchen from "~/assets/brötchen.webp"
import nickerchen from "~/assets/nickerchen.webp"
import mäuschen from "~/assets/mäuschen.webp"

export default definePattern({
  id: "das-chen",
  slug: "diminutives",
  title: "Das -chen",
  shortdesc: "The power of cute diminutives",
  explanation: md`
Some non-English languages have a standard way to modify nouns to create _diminutives_. This is a particularly wonderful feature that lets you take a word and make it more "cute", emphasizing its littleness and smallness.

<LTable translate header="Original / Diminutive" content="
die Katze / das Kätzchen
das Brot / das Brötchen
der Pantoffel, das Tier / das Pantoffeltierchen
"/>

Do you see the pattern? These kinds of diminutives are always neuter, no matter what gender the base word originally had! So even if you haven't seen a specific word before, you know you can use _das_ if it ends in _-chen_.

Diminutives can also end in _-lein_, which is similarly always _das_, but this is much less common than _-chen_ in modern German. Words ending in _-lein_ tend to sound pretty old-fashioned.

<Tip title="Smol prevalence" content="
Some nouns are used mainly in their diminutive form. For example, _das Eichhörnchen_ is more common than _das Eichhorn_. _das Mädchen_ refers to a young girl, while the root _die Magd_ (the maid) would sound very archaic in comparison.
">
  `,
  /**
   * What is the user practicing here?
   *
   * - chen words are always das
   * - combined with prior patterns:
   *    - using the right gendered form of ein/mein/etc
   *    - plural overrides the das
   */
  story: [
    {
      from: "lukas",
      message: "Töski, hast du mein Brötchen gegessen?",
      translation: "Töski, did you eat my bread roll?",
    },
    {
      from: "squirrel",
      message:
        "Dein Brötchen ist zum Brennstoff für das ewige Feuer meiner Seele geworden.",
      translation:
        "Your bread roll has become fuel for the eternal fire of my soul.",
    },
    {
      from: "lukas",
      message: "Und was ist mit mein Haselnüsschen?",
      translation: "And what about my little hazelnut?",
    },
    {
      from: "squirrel",
      message:
        "Deine Haselnüsschen funkeln in den Weiten des Gedankenraums.",
      translation:
        "Your little hazelnuts sparkle in the far reaches of mindspace.",
    },
    {
      from: "squirrel",
      message: "Jetzt werde ich ein Nickerchen machen. Gute Nacht.",
      translation: "Now I will have a nap. Good night.",
    },
  ],
  exercises: [
    {
      from: 'squirrel',
      type: 'choice',
      image: kätzchen,
      message: `Wie heißt diese niedliche Kreatur?`,
      translation: "What is the name of this cute creature?",
      choices: [
        { text: "die Kätzchen", correct: false },
        { text: "das Kätzchen", correct: true },
        { text: "die Katzchen", correct: false },
        { text: "das Katzchen", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: mäuschen,
      message: `Wie heißt die Kreatur, die meiner Projektion ähnelt?`,
      translation: "What is the name of the creature that resembles my projection?",
      choices: [
        { text: "das Mäuschen", correct: true },
        { text: "die Mäuschen", correct: false },
        { text: "das Mauschen", correct: false },
        { text: "die Mauschen", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: nickerchen,
      message: `Was macht das Kätzchen?`,
      translation: "What is the kitten doing?",
      choices: [
        { text: "das Nickerchen", correct: false },
        { text: "die Nickerchen", correct: false },
        { text: "ein Nickerchen", correct: true },
        { text: "eine Nickerchen", correct: false }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: brötchen,
      message: `Was isst du zum Frühstück?`,
      translation: "What do you eat for breakfast?",
      choices: [
        { text: "eine Brotchen", correct: false },
        { text: "ein Brotchen", correct: false },
        { text: "eine Brötchen", correct: false },
        { text: "ein Brötchen", correct: true }
      ]
    },
    // {
    //   from: "squirrel",
    //   message: "[Die] Nüsschen auf diesem Planeten sind besonders lecker. Zu Hause ist das ein gut gehütetes Geheimnis.",
    //   translation: "[The] little nuts on this planet are especially delicious. It's a well-kept secret back home."
    // },
    // {
    //   from: "lukas",
    //   message: "Kann [ein] außerirdisches Eichhörnchen überhaupt die irdische Flora verdauen...?",
    //   translation: "Can [an] alien squirrel even digest Earth flora...?"
    // },
    // {
    //   from: "lindenbaum",
    //   message: "[Das] Pantoffeltierchen hat mehrere Zellkerne. Eine große Zelle muss viele Proteine herstellen!",
    //   translation: "[The] paramecium has many nuclei. A big cell must make lots of proteins!"
    // },
    // {
    //   from: "fox",
    //   message: "Wie kann [das] tote Mäuschen so gute Musik machen?",
    //   translation: "How does [the] little dead mouse make such good music?"
    // }
  ],
  feedback: [
    {
      answer: "das",
      attempt: "die",
      message: "That's the feminine form. A _-chen_ word is always neuter."
    },
    {
      answer: "das",
      attempt: "der",
      message: "That's the masculine form. A _-chen_ word is always neuter."
    },
    {
      answer: "die",
      attempt: "das",
      message: "_das_ would be correct for the singular. However, this word is pluralized."
    },
    {
      answer: "meine",
      attempt: "mein",
      message: "_das_ would be correct for the singular. However, this word is pluralized."
    }
  ]
})



    // // LEVEL 1
    // {
    //   lines: [
    //     {
    //       from: "lukas",
    //       message: "Oh je, [das] Eichhörnchen liegt auf dem Tisch.",
    //       translation: "Oh dear, [the] squirrel is on the table."
    //     },
    //     {
    //       from: "squirrel",
    //       message: "Wie nennt man diese kleine gebogene Waffe?",
    //       translation: "What do you call this tiny curved weapon?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Das ist [ein] Löffelchen. Es ist ein Werkzeug zum Essen, keine Waffe.",
    //       translation: "That is [a] little spoon. It's a tool for eating, not a weapon."
    //     },
    //     {
    //       from: "squirrel",
    //       message: "Und was ist diese zähflüssige alchemistische Lösung?",
    //       translation: "And what is this viscous alchemical solution?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Töski, bitte steck [dein] Pfötchen nicht in die Suppe.",
    //       translation: "Töski, please don't put [your] little paw in the soup."
    //     }
    //   ]
    // },
