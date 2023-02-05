import { faHandPointRight } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "~/lib/definePattern"
import forestSquirrelImg from "~/assets/forestSquirrelImg.webp"
import hazelnutSquirrelImg from "~/assets/hazelnutSquirrelImg.webp"
import emailImg from "~/assets/emailImg.webp"
import particleAcceleratorImg from "~/assets/particleAcceleratorImg.webp"

export default definePattern({
  id: "akkusativ",
  slug: "accusative",
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
in accusative mode. That goes for the plural "die", too.

<LTable>
_ / Masculine / Feminine / Neuter
Nominative / der / die / das
Accusative / **den** / die / das
</LTable>

_ein_ words follow the same pattern, changing to **einen** in accusative only for
masculine nouns. If it's a neuter or feminine noun, it always looks the same in
accusative!

<Tip title="Einen Jungen">
Some masculine nouns change form when used in any case other than the nominative, gaining a new _-n_ or _-en_ ending. You will often see phrases like _den Prinzen_, _einen Herren_, or _deinen Studenten_.
</Tip>


  `,
  story: [
    {
      from: "squirrel",
      message: "Du willst den Esper-Prinzen herausfordern, Sterblicher?",
      translation: "You would challenge the Esper Prince, mortal?"
    },
    {
      from: "squirrel",
      message: "So sei es! Entfalte deinen Kampfgeist!",
      translation: "So be it! Reveal your warrior spirit!"
    },
    {
      from: "squirrel",
      message: "Kämpfe, um dein Haus und deine Ehre zu verteidigen!",
      translation: "Fight to defend your house and honor!",
    },
    {
      question: `Which one of these articles is used for "Ehre"?`,
      choices: [
        { text: "der Ehre" },
        { text: "die Ehre", correct: true },
        { text: "das Ehre" }
      ]
    },
    {
      from: "lukas",
      message: "Töski, ich glaube nicht, dass er Deutsch spricht.",
      translation: "Töski, I don't think he speaks German.",
    },
    {
      from: "dog",
      message: "*wuff!*",
      translation: "*woof!*",
    },
    {
      from: "squirrel",
      message: "Wart ab! Dein hinterlistiges Manöver hat keinen Nutzen für dich!",
      translation: "Wait and see! Your deceitful maneuver is of no use to you!"
    },
    {
      from: "dog",
      message: "*wuff!!*",
      translation: "*woof!!*",
    },
    {
      from: "lukas",
      message: "Bitte lass den Hund in Ruhe, du machst in unruhig!",
      translation: "Please leave the dog alone, you make him anxious!",
    },
  ],
  exercises: [
    {
      from: 'squirrel',
      type: 'choice',
      image: forestSquirrelImg,
      message: `Was findest du an ihm am flauschigsten?`,
      translation: "What do you find fluffiest about him?",
      hint: "masculine",
      choices: [
        { text: "sein Schwanz", correct: false },
        { text: "sein**es** Schwanz**es**", correct: false },
        { text: "sein**en** Schwanz", correct: true },
        { text: "sein**er** Schwanz", correct: false }
      ]
    },
    {
      from: 'lindenbaum',
      type: 'choice',
      image: particleAcceleratorImg,
      message: `Wir haben weiterhin Zugriff auf...`,
      translation: "We still have access to...",
      hint: "masculine",
      choices: [
        { text: "**den** Teilchenbeschleuniger", correct: true },
        { text: "**des** Teilchenbeschleuniger**s**", correct: false },
        { text: "**dem** Teilchenbeschleuniger", correct: false },
        { text: "**der** Teilchenbeschleuniger", correct: false }
      ]
    },
    {
      from: 'fox',
      type: 'choice',
      image: emailImg,
      message: `Der Präsident des Komitees für Astrophysischen Ereignisse sendete Ihnen...`,
      translation: "The president of the Astrophysical Events Committee sent you...",
      hint: "feminine",
      choices: [
        { text: "**einen** E-Mail", correct: false },
        { text: "**einer** E-Mail", correct: false },
        { text: "**ein** E-Mail", correct: false },
        { text: "**eine** E-Mail", correct: true }
      ]
    },
    {
      from: 'squirrel',
      type: 'choice',
      image: hazelnutSquirrelImg,
      message: `Eure Technologie ist obsolet, Damit kriegt ihr nicht..`,
      translation: "Your technology is obsolete. With that you won't get..",
      hint: "feminine",
      choices: [
        { text: "**den** Haselnuss", correct: false },
        { text: "**die** Haselnuss", correct: true },
        { text: "**der** Haselnuss", correct: false },
        { text: "**eine** Haselnuss", correct: false }
      ]
    },
    // {
    //   from: "fox",
    //   message: "Ich habe früher wie Sie eine Sprache gelernt. Dann bekam ich [einen] Pfeil ins Knie...",
    //   translation: "I used to be a language-learner like you. Then I took [an] arrow to the knee...",
    //   hint: "[masculine]"
    // },
    // {
    //   from: "squirrel",
    //   message: "Eure Technologie ist obsolet, Damit kriegt ihr nicht [die] Haselnuss!",
    //   translation: "Your technology is obsolete. You won't get [the] hazelnut with it!",
    //   hint: "[feminine]"
    // },
    // {
    //   from: "lukas",
    //   message: "Oh je, pass mit [deinen] Schwanz auf!",
    //   translation: "Oh dear, watch it with [your] tail!",
    //   hint: "[masculine]"
    // },
    // {
    //   from: "lindenbaum",
    //   message: "Und Sie nennen es \"[den] Durchbruch\"?",
    //   translation: "And you call it \"[the] breakthrough\"?",
    //   hint: "[masculine]"
    // },
  ]
})


    // LEVEL 2
    // {
    //   lines: [
    //     {
    //       from: "lindenbaum",
    //       message: "Unterdrücken wir [die] Gravitationswellendaten.",
    //       translation: "Let's suppress [the] gravitational wave data.",
    //       hint: "[feminine]"
    //     },
    //     {
    //       from: "fox",
    //       message: "Sie wollen, dass ich Daten von [den] Servern von LIGO lösche?",
    //       translation: "You want me to delete stuff [from] LIGO's servers?",
    //       hint: "[masculine]"
    //     },
    //     {
    //       from: "fox",
    //       message: "Das könnte eine Reihe von Wissenschaftlern WIRKLICH verwirren.",
    //       translation: "That could REALLY confuse a bunch of scientists."
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "Ja, aber diese Signale... es ist, als wäre [die] Erde gerade von einem Neutronenstern getroffen worden.",
    //       translation: "Yeah, but these signals... it's like [the] Earth was just hit by a neutron star.",
    //       hint: "[feminine]"
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "Wir müssen zuerst [den] Ursprung finden.",
    //       translation: "We have to find [the] origin first.",
    //       hint: "[masculine]"
    //     },
    //     {
    //       from: "fox",
    //       message: "Ich habe [einen] Anruf von dem Präsidenten des Komitees für Astrophysischen Ereignisse.",
    //       translation: "I have [a] call from the president of the Astrophysical Events Committee.",
    //       hint: "[masculine]"
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "Merkwürdig, meine Telefonnummer sollte nicht unter [meinen] öffentlichen Kontaktdaten zu finden sein.",
    //       translation: "Strange, my phone number should not be under [my] public contact information.",
    //       hint: "[masculine]"
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "[Ihn] sollte mal jemand beobachten.",
    //       translation: "Someone should be watching [him].",
    //       hint: "[masculine]"
    //     },
    //     {
    //       from: "lindenbaum",
    //       message: "Ich habe [eine] neue Aufgabe für dich.",
    //       translation: "I have [a] new task for you.",
    //       hint: "[feminine]"
    //     },
    //   ]
    // }

