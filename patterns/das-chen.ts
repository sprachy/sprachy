import { faCat } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'das-chen',
  slug: 'das-chen',
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

<Tip title="Smol prevalence">
Some nouns are used mainly in their diminutive form. For example, _das Eichhörnchen_ is more common than _das Eichhorn_. _das Mädchen_ refers to a young girl, while the root _die Magd_ (the maid) would sound very archaic in comparison.
</Tip>
`,
  exercises: [
    {
      from: 'lukas',
      message: 'Tösky, hast du [mein] Brötchen gegessen?',
      translation: 'Tösky, did you eat [my] bread roll?'
    },
    {
      from: 'squirrel',
      message: '[Dein] Brötchen ist zum Brennstoff für das ewige Feuer meiner Seele geworden.',
      translation: '[Your] bread roll has become fuel for the eternal fire of my soul.'
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
  ]
})