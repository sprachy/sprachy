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

<ltable header="Deutsch / Meaning">
die Katze / the cat
das Kätzchen / the kitten
das Brot / the bread
das Brötchen / the bread roll
der Pantoffel / the slipper
das Tier / the animal
das Pantoffeltierchen / a unicellular ciliate protozoan of the Paramecium genus
</ltable>

Do you see the pattern? These kinds of diminutives are always neuter, no matter what gender the base word originally had. So even if you haven't seen a specific word before, you know you can use _das_ if it ends in _-chen_.

Some words are used primarily or only in their diminutive form, while the base form is relatively uncommon. For example, _das Eichhörnchen_ is more often used to talk about the average squirrel than _das Eichhorn_. _das Mädchen_ refers to a young girl, while the root _die Magd_ (the maid) would sound very archaic in comparison. 

`,
  exercises: [
    {
      content: md`
<dialogue>
<dline by="anna">
Tösky, hast du [mein] Brötchen gegessen?
Tösky, did you eat [my] bread roll? 
</dline>

<dline by="squirrel">
Ja. Es ist zum Brennstoff für das ewige Feuer meiner Seele geworden.
Yes. It has become fuel for the eternal fire of my soul.
</dline>
</dialogue>
      `,
    }
  ]
})