import { faHandPointRight } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "akkusativ",
  slug: "akkusativ",
  title: "Den Akkusativ",
  shortdesc: "For ~~accusing people~~ direct objects",
  icon: faHandPointRight,
  explanation: md`
In English, the nominative pronouns "he" and "she" change to "him" and "her" when the person
is the direct object of a sentence, being acted on by a verb. For example:

<LTable header="Nominative / Accusative">
_he_ is very fluffy / I want to pet _him_
_she_ is very good at Tetris / it's hard to win against _her_
</LTable>

In German, this change applies not only to pronouns but also to an equivalent of "the"
(called the definite article): "der" changes to "den", when you're talking about doing
something _to_ a masculine noun.

<DialogueExample>
squirrel:
  Sie dürfen **den** Esper-Prinzen streicheln, wenn Sie Mandeln haben.
  You may pet **the** Esper Prince, if you have almonds.
</DialogueExample>

This _only_ happens with masculine nouns. "die" and "das" stay the same
in accusative mode.

<LTable>
_ / Masculine / Feminine / Neuter
Nominative / der / die / das
Accusative / **den** / die / das
</LTable>

_ein_ words follow the same pattern, changing to **einen** in accusative only for
masculine nouns. If it's a neuter or feminine noun, it always looks the same in
accusative!
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
