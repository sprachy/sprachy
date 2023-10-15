---
id: nominative
title: Der, die, das
shortdesc: Ah yes, the three genders

dialogue:
  lines:
  - from: squirrel
    message: Lukas, was ist das?
    translation: Lukas, what is that?
    image: sonne
    imageAlt: The sun shining brightly
  - from: lukas
    message: Das ist die Sonne.
    translation: That is the sun.
    # explanation: `Lukas uses the word _die_ to mean _the_ here, because _Sonne_ is a feminine noun. `
  - from: lukas
    message: Sie gibt unserem Planeten Wärme und Energie.
    translation: It gives our planet energy and heat.
    explanation: Lukas refers to the sun using the feminine pronoun _sie_.
  - from: squirrel
    message: Und was ist das Blaue?
    translation: And what is the blue?
    # explanation: `Töski uses _das_ because Blaue is a neuter noun.`
  - from: lukas
    message: Das ist der Himmel.
    translation: That is the sky.
  - from: lukas
    message: Vögel🐦 fliegen dort.
    translation: Birds fly there.
  - from: squirrel
    message: Warum ist er blau?
    translation: Why is it blue?
  - question: What is Töski referring to with "er"?
    choices:
    - text: der Himmel
      correct: true
    - text: die Sonne
    - text: die Vogel
  - from: lukas
    message: Das ist... kompliziert.
    translation: That is... complicated.
  - from: lukas
    message: Es geht um die Physik des Lichts.
    translation: It has to do with the physics of light.
  - from: squirrel
    message: Kann ich ihn essen?
    translation: Can I eat it?
  - from: lukas
    message: ...du willst den Himmel essen?
    translation: ...you want to eat the sky?
  - from: squirrel
    message: Ja, er sieht lecker aus.
    translation: Yes, it looks tasty.
  - from: lukas
    message: Bitte nicht.
    translation: Please don't.

exercises:
- from: squirrel
  type: choice
  image: acorn.webp
  message: Wie nennt man diese köstliche Frucht?
  translation: What do you call this delicious fruit?
  hint: feminine
  choices:
  - { text: "**der** Eichel", correct: false }
  - { text: "**die** Eichel", correct: true }
  - { text: "**das** Eichel", correct: false }
  - { text: "**ein** Eichel", correct: false }
- from: squirrel
  type: choice
  image: bunny.webp
  message: Wer springt herum?
  translation: Who is hopping around?
  hint: masculine
  choices:
  - { text: "**eine** Hase", correct: false }
  - { text: "**der** Hase", correct: true }
  - { text: "**das** Hase", correct: false }
  - { text: "**die** Hase", correct: false }
- from: squirrel
  type: choice
  image: tree-house.webp
  message: Wie nennt man diese Unterkunft?
  translation: What do you call this dwelling?
  hint: neuter
  choices:
  - { text: "**den** Baumhaus", correct: false }
  - { text: "**der** Baumhaus", correct: false }
  - { text: "**das** Baumhaus", correct: true }
  - { text: "**die** Baumhaus", correct: false }
- from: squirrel
  type: choice
  image: shopping-cart.webp
  message: Wie nennt man diese viele Rad-Kisten?
  translation: What do you call these many wheel boxes?
  hint: plural
  choices:
  - { text: "**eine** Einkaufswagen", correct: false }
  - { text: "**dem** Einkaufswagen", correct: false }
  - { text: "**das** Einkaufswagen", correct: false }
  - { text: "**die** Einkaufswagen", correct: true }
---

Der, die, and das are three ways of saying _the_ in German. Which one you use depends on the _grammatical gender_ of the noun that follows.

::LTable
---
header: Gender / Deutsch / Meaning
content: |
  neuter / **das** Eichhörnchen / **the** squirrel
  masculine / **der** Baum / **the** tree
  feminine / **die** unendliche Leere / **the** infinite void
---
::

These are all in what's called the _nominative case_, the case where we're talking about the subject of a sentence (like a squirrel), unmodified by any verbs.

The gender of a particular noun usually has nothing to do with what that word describes. It's not that trees are particularly manly, or that ominous voids are particularly girly. That's simply the _grammatical_ gender those nouns happen to have, by consensus of German speakers.

Generally, you want to learn the gender together with the word. Rather than remembering that _Baum_ means tree, try to remember _der Baum_! However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.

Roughly speaking, around 40% of nouns are masculine, 40% are feminine, and 20% are neuter. A very small number of words have more than one gender. They're fancy and rare like shiny Pokémon!

::DialogueExample
---
content: |
  squirrel:
    Aber **die** Plurale!
    But **the** plurals!
---
::

For plurals, we always use _die_, regardless of the noun's base gender. For example, _der Baum_ would become _die Bäume_ when talking about mulitiple trees. Meanwhile, _das_ when used without a noun can also have the meaning of "that" or "it".

::Tip
---
content: |
  Unlike in English, the first letter of every noun in German is **C**apitalized. This is particularly useful when learning the language, as it makes nouns easy to identify.
---
::