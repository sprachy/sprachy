import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "dativ",
  slug: "dativ",
  title: "Dem Dativ",
  shortdesc: "",
  icon: faHandHoldingHeart,
  explanation: md`
The dative noun case is used when referring to the _indirect object_ of a sentence. What's an indirect object? Something that is affected by a verb, but is not the direct object. Like the recipient of a gift:

<TextHighlighter>
<span class="actor">The boy</span> gives <span class="indirectobject">the squirrel</span> <span class="directobject">the almond</span>.
</TextHighlighter>

In English, we know whether an object is direct or indirect by the order of the words. "the boy gives the almond the squirrel" would have a totally different meaning! In German, the word order is much more flexible, because you can tell the indirect object from the use of the dative case instead.

<TextHighlighter>
<span class="actor">Der Junge</span> gibt <span class="indirectobject">dem Eichhörnchen</span> <span class="directobject">die Mandel</span>.
</TextHighlighter>

<TextHighlighter>
<span class="actor">Der Junge</span> gibt <span class="directobject">die Mandel</span> <span class="indirectobject">dem Eichhörnchen</span>.
</TextHighlighter>

<Tip title="Der Frau">
Be careful not to confuse the feminine dative _der_ with the masculine nominative _der_, or the plural dative _den_ with the masculine accusative _den_. While spelled the same, they are effectively different words.<br><br> If you know the gender/plurality of the noun you can reliably distinguish them; otherwise, you'll have to rely on contextual clues to the dativeness, e.g. the use of a transitive verb like _geben_.
</Tip>
  `,
  stories: [
    // LEVEL 1
    {
      lines: [
        {
          from: "squirrel",
          message: "Du willst [den] Esper-Prinzen herausfordern, Sterblicher?",
          translation: "You would challenge [the] Esper Prince, mortal?"
        },
        {
          from: "squirrel",
          message: "So sei es! Entfalte [deinen] Kampfgeist!",
          translation: "So be it! Reveal [your] warrior spirit!",
          hint: "[masculine]",
        },
        {
          from: "squirrel",
          message: "Kämpfe, um [dein] Haus und deine Ehre zu verteidigen!",
          translation: "Fight to defend [your] house and honor!",
          hint: "[neuter]",
        },
        {
          from: "lukas",
          message: "Töski, ich glaube nicht, dass er Deutsch spricht.",
          translation: "Töski, I don't think he speaks German.",
        },
        {
          from: "dog",
          message: "*wuf!*",
          translation: "*woof!*",
        },
      ]
    }
  ]
})
