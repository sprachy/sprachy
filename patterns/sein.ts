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
  Das Meme ist alt. **Es ist** ein uraltes Meme.
  The meme is old. **It is** an ancient meme.
</DialogueExample>

Note that _Sie sind_ (with the capital S) is special in that it can be both singular or plural (like English _they are_), and is the polite form used especially when talking with strangers. We'll learn more about it later in patterns on formal/informal language!
  `,
  stories: [
    // LEVEL 1
    {
      lines: [
        {
          from: "harald",
          message: "[Sein] oder Nichtsein?",
          translation: "To be or not to be?",
          hint: "[infinitive]",
        },
        {
          from: "harald",
          message: "Die Entscheidung [ist] mein!",
          translation: "The decision [is] mine!",
          hint: "[3rd person singular]",
        },
        {
          from: "harald",
          message: "Denn ich [bin] der größte Ritter.",
          translation: "For I [am] the greatest knight.",
          hint: "[1st person singular]",
        },
        {
          from: "harald",
          message: "Doch [Ihr] seid die kleinste Leiter.",
          translation: "But [you] are the smallest ladder.",
          hint: "[2nd person plural]",
        },
        {
          from: "harald",
          message: "Denn sie [ist] die Leiter zum Erfolg.",
          translation: "For it [is] the ladder to success.",
          hint: "[3rd person singular]",
        },
        {
          from: "harald",
          message: "So [bin] ich der größte Poet aller Zeiten.",
          translation: "Thus I [am] the greatest poet of all time.",
          hint: "[1st person singular]",
        },
        {
          from: "klaus",
          message: "miep.",
          translation: "meep.",
        },
        {
          from: "harald",
          message: "Und du [bist] das kleinste Mäuschen.",
          translation: "And you are the smallest mouse.",
          hint: "[2st person singular]",
        },
        {
          from: "harald",
          message: "Und zusammen [sind] wir das perfekte Duo!",
          translation: "And together we [are] the perfect duo!",
          hint: "[1st person plural]",
        },
        {
          from: "klaus",
          message: "miep miep!",
          translation: "meep meep!.",
        },
        {
          from: "harald",
          message: "Ach du [bist] hungrig?",
          translation: "Oh you [are] hungry?",
          hint: "[2nd person singular]",
        },
      ]
    },
  ],
})
