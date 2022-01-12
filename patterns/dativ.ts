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

<TextHighlighter parts="actor, indirectobject, directobject">
[The boy] gives [the squirrel] [the almond].
</TextHighlighter>

In English, we know whether an object is direct or indirect by the order of the words. "the boy gives the almond the squirrel" would have a totally different meaning! In German, the word order is much more flexible, because you can tell the indirect object from the use of the dative case instead.

<TextHighlighter parts="actor, indirectobject, directobject">
[Der Junge] gibt [dem Eichhörnchen] [die Mandel].
</TextHighlighter>

<TextHighlighter parts="actor, directobject, indirectobject">
[Der Junge] gibt [die Mandel] [dem Eichhörnchen].
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
          from: "lukas",
          message: "Der Junge gibt [dem] Eichhörnchen eine Mandel.",
          translation: "The boy gives [the] squirrel an almond."
        },
        {
          from: "squirrel",
          message: "Das Eichhörnchen dankt [dem] Jungen für sein Angebot.",
          translation: "The squirrel thanks [the] boy for his offering."
        },
        {
          from: "anna",
          message: "Willst du [der] Schwester auch eine Mandel geben?",
          translation: "Will you give [the] sister an almond too?"
        },
        {
          from: "lukas",
          message: "Vorsicht, er ist ziemlich besitzergreifend bei [den Mandeln].",
          translation: "Careful, he's pretty possessive with [the almonds]."
        },
        {
          from: "squirrel",
          message: "Das Eichhörnchen wird [einem] Menschen helfen, dieses eine Mal.",
          translation: "The squirrel will help [a] human, this once."
        }
      ]
    }

    // // LEVEL 1
    // {
    //   lines: [
    //     {
    //       from: "anna",
    //       message: "Du hast niemandem von [dem] außerirdischen Eichhörnchen erzählt?",
    //       translation: "You haven't told anyone about [the] alien squirrel?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Ehrlich gesagt, weiß ich nicht, wie die Welt darauf reagieren würde.",
    //       translation: "Honestly, I don't know how the world would react."
    //     },
    //     {
    //       from: "lukas",
    //       message: "Und Töski ist hier [im] Urlaub. Er braucht die Politik nicht.",
    //       translation: "And Töski is here [on] vacation. He doesn't need the politics.",
    //       hint: "[masculine]"
    //     },
    //     {
    //       from: "anna",
    //       message: "Nicht nur, weil er wirklich süß und flauschig ist?",
    //       translation: "It's not just because he's really cute and fluffy?"
    //     },
    //     {
    //       from: "lukas",
    //       message: "Okay, das könnte ein Faktor sein.",
    //       translation: "Okay, that might be a factor."
    //     },
    //   ]
    // }
  ]
})