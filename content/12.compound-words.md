---
id: compound-words
title: Compound words
shortdesc: Fledermaus (bat) is "flutter mouse"

dialogue:
  lines:
  - from: squirrel
    message: Was ist dieses kleine schleimige Tier?
    translation: What is this small slimy animal?
  - from: lukas
    message: Das ist eine **Nacktschnecke**.
  - from: squirrel
    message: 'Ach so, ich verstehe! Sie ist wie eine Schnecke, aber nackt.'
    translation: 'Aha, I see! It is like a snail, but naked.'
  - question: Was bedeutet "Nacktschnecke"?
    translation: What does "Nacktschnecke" mean?
    choices:
      - text: turtle
      - text: slug
        correct: true
      - text: snake
      - text: frog
  - from: lukas
    message: 'Ja, du hast recht!'
    translation: 'Yes, you are right!'
  - from: squirrel
    message: Und was ist mit dieser schwimmenden Kreatur mit vielen Tentakeln?
    translation: And what about this swimming creature with lots of tentacles?
  - from: lukas
    message: Das ist ein **Tintenfisch**!
  - from: lukas
    message: Es spritzt Tinte. Aber es ist nicht wirklich ein Fisch.
    translation: It sprays ink. But it is not really a fish.
  - question: Was bedeutet "Tintenfisch"?
    translation: What does "Tintenfisch" mean?
    choices:
      - text: shark
      - text: lobster
      - text: clam
      - text: squid
        correct: true
  - from: squirrel
    message: Das gefällt mir!
    translation: I like it!
  - from: squirrel
    message: Euer Planet hat viele edle Lebensformen.
    translation: Youre planet has many noble lifeforms.

exercises:
- from: squirrel
  type: fillblank
  message: |
    Ein **Schrank**, der **kühl** gehalten wird. Sie nennen es einen
    [Kühlschrank]!
  translation: 'A cupboard, that is kept cool. They call it a [fridge]!'
- from: lukas
  type: fillblank
  message: Es ist wie ein **Schuh** für deine **Hand**. Ein [Handschuh]!
  translation: It's like a shoe for your hand. A [glove]!
- from: lindenbaum
  type: fillblank
  message: |
    Mit der Kraft von **Zeug** haben die Menschen den **Flug** erobert. Wir
    haben ein [Flugzeug] gebaut!
  translation: 'With the power of stuff, humans conquered flight. We built a [plane]!'
    # // // LEVEL 1
    # // {
    # //   lines: [
    # //     {
    # //       from: "lukas",
    # //       message: "Oh je, [das] Eichhörnchen liegt auf dem Tisch.",
    # //       translation: "Oh dear, [the] squirrel is on the table."
    # //     },
    # //     {
    # //       from: "squirrel",
    # //       message: "Wie nennt man diese kleine gebogene Waffe?",
    # //       translation: "What do you call this tiny curved weapon?"
    # //     },
    # //     {
    # //       from: "lukas",
    # //       message: "Das ist [ein] Löffelchen. Es ist ein Werkzeug zum Essen, keine Waffe.",
    # //       translation: "That is [a] little spoon. It's a tool for eating, not a weapon."
    # //     },
    # //     {
    # //       from: "squirrel",
    # //       message: "Und was ist diese zähflüssige alchemistische Lösung?",
    # //       translation: "And what is this viscous alchemical solution?"
    # //     },
    # //     {
    # //       from: "lukas",
    # //       message: "Töski, bitte steck [dein] Pfötchen nicht in die Suppe.",
    # //       translation: "Töski, please don't put [your] little paw in the soup."
    # //     }
    # //   ]
    # // },
---

In many languages, humans like to create new words by smooshing together two or more existing ones. The meaning of the new word may be immediately obvious from the roots, or it might derive it in a more subtle or historical way. For example, in English:

::LTable
---
header: Compound / Etymology
content: |
  blueberry / blue + berry: Obviously it's a berry, and it's blue. Note how it doesn't refer to _any_ blue berry though, only the blueberry!
  flashback / flash + back: A 'flash' of memory back to the past, by analogy to a flash of light.
  strawberry / straw + berry: Not in the sense of the material "straw", but rather the historical meaning "that which has been strewn".
---
::

Recognizing this pattern is helpful when learning a language: you can sometimes infer the meaning of an unknown compound word if you already know the roots. It can also help you recall words once you do know the meaning, since the literal translations are often quite silly and memorable. For example:

::LTable
---
header: Compound / Etymology
content: |
  die Fledermaus (the bat) / 'flutter mouse' - From Old German fledarōn (flutter) and _die Maus_.
  das Faultier (the sloth) / 'lazy animal' - From _faul_ + _das Tier_.
  das Wasserschwein (the capybara) / 'water pig' - From _das Wasser_ + _das Schwein_.
---
::

Note how compound nouns inherit the gender of their ending root. The many German animal names ending in _tier_ all use _das_.

Many verbs in German are formed by adding a prefix like _ein-_ or _ver-_ to a another verb, like _kaufen_ (to buy) => _einkaufen_ (to shop). These are a bit quirky and the meaning is not always easily inferrable; we'll cover separable and inseperable verb prefixes in another pattern.

In English, we often make new words not by combining existing English words, but from Latin or Greek roots. This is especially true for medical or scientific terminology. In German, it's much more common to just use German roots. The English word [paramecium](https://en.wikipedia.org/wiki/Paramecium) is derived from Ancient Greek, but in German it's just [das Pantoffeltierchen](https://de.wikipedia.org/wiki/Pantoffeltierchen) ("slipper animal little").

German sometimes likes to take compound words to extreme lengths. Names for government programs are particularly notorious for this, such as [das Bundesausbildungsförderungsgesetz](https://en.wikipedia.org/wiki/BAf%C3%B6G), the Federal Training Assistance Act in Germany-- which most people quite reasonably abbreviate to BAföG. Good to master compounds if you need to submit forms in Germany!
