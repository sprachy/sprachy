import { faHandPointRight } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "akkusativ",
  slug: "akkusativ",
  title: "Den Akkusativ",
  shortdesc: "For ~~accusing people~~ direct objects",
  icon: faHandPointRight,
  explanation: md`
The previous pattern exercises were all in what's called the _nominative case_, where
words like _der_ and _ein_ are referring to the subject of the sentence.

TODO
  `,
  stories: [
    // LEVEL 1
    {
      lines: [
        {
          from: "squirrel",
          message: "Du willst [mich] herausfordern, Sterblicher?",
          translation: "You would challenge [me], mortal?"
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
