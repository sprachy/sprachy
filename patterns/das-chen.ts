import { faCat } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'das-chen',
  slug: 'das-chen',
  title: "Das -chen",
  shortdesc: "",
  icon: faCat,
  explanation: md`
Some non-English languages have a standard way to modify nouns to create _diminutives_. This is a particularly wonderful feature that lets you take a word and make it more "cute", emphasizing its littleness and smallness.

<ltable header="Deutsch / Meaning">
die Katze / the cat
das Kätzchen / the kitten


</ltable>

Do you see the pattern? These kinds of diminutives are always neuter, no matter what gender the base word originally had. So even if you haven't seen a specific word before, you know you can use _das_ if it ends in _-chen_.


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