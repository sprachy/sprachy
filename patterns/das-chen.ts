import { faCat } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "das-chen",
  slug: "das-chen",
  title: "Das -chen",
  shortdesc: "The power of cute diminutives",
  icon: faCat,
  explanation: md`
Some non-English languages have a standard way to modify nouns to create _diminutives_. This is a particularly wonderful feature that lets you take a word and make it more "cute", emphasizing its littleness and smallness.

<ltable translate header="Original / Diminutive">
die Katze / das Kätzchen
das Brot / das Brötchen
der Pantoffel, das Tier / das Pantoffeltierchen
</ltable>

Do you see the pattern? These kinds of diminutives are always neuter, no matter what gender the base word originally had! So even if you haven't seen a specific word before, you know you can use _das_ if it ends in _-chen_.

Diminutives can also end in _-lein_, which is similarly always _das_, but this is much less common than _-chen_ in modern German. Words ending in _-lein_ tend to sound pretty old-fashioned.

<Tip title="Smol prevalence">
Some nouns are used mainly in their diminutive form. For example, _das Eichhörnchen_ is more common than _das Eichhorn_. _das Mädchen_ refers to a young girl, while the root _die Magd_ (the maid) would sound very archaic in comparison.
</Tip>
  `,
  stories: [
    /**
     * What is the user practicing here?
     *
     * - chen words are always das
     * - combined with prior patterns:
     *    - using the right gendered form of ein/mein/etc
     *    - plural overrides the das
     */

    // LEVEL 1
    {
      lines: [
        {
          from: "lukas",
          message: "Oh je, [das] Eichhörnchen liegt auf dem Tisch.",
          translation: "Oh dear, [the] squirrel is on the table."
        },
        {
          from: "squirrel",
          message: "Wie nennt man diese kleine gebogene Waffe?",
          translation: "What do you call this tiny curved weapon?"
        },
        {
          from: "lukas",
          message: "Das ist [ein] Löffelchen. Es ist ein Werkzeug zum Essen, keine Waffe.",
          translation: "That is [a] little spoon. It's a tool for eating, not a weapon."
        },
        {
          from: "squirrel",
          message: "Und was ist diese zähflüssige alchemistische Lösung?",
          translation: "And what is this viscous alchemical solution?"
        },
        {
          from: "lukas",
          message: "Töski, bitte steck [dein] Pfötchen nicht in die Suppe.",
          translation: "Töski, please don't put [your] little paw in the soup."
        }
      ]
    },

    // LEVEL 2
    {
      lines: [
        {
          from: "lukas",
          message: "Tösky, hast du [mein] Brötchen gegessen?",
          translation: "Tösky, did you eat [my] bread roll?",
        },
        {
          from: "squirrel",
          message:
            "[Dein] Brötchen ist zum Brennstoff für das ewige Feuer meiner Seele geworden.",
          translation:
            "[Your] bread roll has become fuel for the eternal fire of my soul.",
        },
        {
          from: "lukas",
          message: "Und was ist mit [meine] Haselnüsschen?",
          translation: "And what about [my] little hazelnuts?",
        },
        {
          from: "squirrel",
          message:
            "[Deine] Haselnüsschen funkeln in den Weiten des Gedankenraums.",
          translation:
            "[Your] little hazelnuts sparkle in the far reaches of mindspace.",
        },
        {
          from: "squirrel",
          message: "Jetzt werde ich [ein] Nickerchen machen. Gute Nacht.",
          translation: "Now I will have [a] nap. Good night.",
        },
      ]
    },

    //     {
    //       content: md`
    // <dialogue>
    // <dline by="anna">
    // Tösky, hast du [mein] Brötchen gegessen?
    // Tösky, did you eat [my] bread roll?
    // </dline>

    // <dline by="squirrel">
    // Ja. Es ist zum Brennstoff für das ewige Feuer meiner Seele geworden.
    // Yes. It has become fuel for the eternal fire of my soul.
    // </dline>
    // </dialogue>
    //       `,
    //     }
  ],
})
