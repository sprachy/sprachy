import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'das-chen',
  slug: 'das-chen',
  title: "Das -chen",
  shortdesc: "",
  icon: faAddressBook,
  explanation: md`
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
Jawohl. Es ist Brennstoff für das unnachgiebige Feuer meiner Seele geworden.
Yes. It has become fuel for the eternal fire of my soul.
</dline>
</dialogue>
      `,
    }
  ]
})