import { faDna } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "sein",
  slug: "sein",
  title: "Sein oder Nichtsein",
  shortdesc: "How to say stuff is or things are",
  icon: faDna,
  explanation: md`
One of the most common German verbs is _sein_, equivalent to the English "to be". "sein" is the infinitive or dictionary form; you'll see it less often in practice than the conjugated forms, like _ich bin_ (I am) or _du bist_ (you are).

<DialogueExample>
squirrel:
  **Bin ich** ein Eichhörnchen?
  **Am I** a squirrel?
lukas:
  **Du bist** wie ein Eichhörnchen geformt. Vielleicht konvergente Evolution?
  **You are** shaped like a squirrel. Maybe convergent evolution?
</DialgoueExample>

Like "to be", sein is an irregular verb, meaning it doesn't share a conjugation pattern with other verbs in the language. It just
does its own thing there. Fortunately, the different forms all show up so often that you'll come to remember them pretty quickly.

<LTable translate inlines header="Singular / Plural">
ich bin (I am) / wir sind (we are)
du bist (you are) / ihr seid (you are)
er ist (he is) / sie sind (they are)
sie ist (she is) / Sie sind (you are)
es ist (it is) / _
</LTable>

Unlike in English, which generally always uses _it_ for inanimate objects, German makes use of the noun gender so that everything has gendered pronouns. _er_, _sie_, or _es_ is used for masculine, feminine or neuter nouns respectively. 


<DialogueExample>
lindenbaum:
  Der Planet ist winzig. **Er ist** eine zerbrechliche, wertvolle Welt.
  The planet is tiny. **It is** a fragile, precious world.
squirrel:
  Die Mandel ist lecker. **Sie ist** eine köstliche Mandel.
  The almond is tasty. **It is** a delicious almond.
fox:
  Das Meme ist alt. **Es ist** ein uraltes Mem.
  The meme is old. **It is** an ancient meme.
</DialogueExample>

Note that _Sie sind_ (with the capital S) is special in that it can be both singular or plural (like English _they are_), and is the polite form used especially when talking with strangers. We'll learn more about it later in patterns on formal/informal language!
  `,
  stories: [
  ],
})
