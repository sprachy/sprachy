import { faListOl } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "der-words",
  slug: "der-words",
  title: "Indefinite articles",
  shortdesc: "For when three articles aren't specific enough",
  icon: faListOl,
  explanation: md`
In English, we use indefinite articles to specify the context of its associated object, for instance: _this squirrel_ has a different meaning than _a squirrel_, as the former is directed at a specific squirrel while the latter can be pointed at any squirrel.

<LTable>
dieses Eichhörnchen / this squirrel
jedes Eichhörnchen / each, every squirrel
jenes Eichhörnchen / that squirrel
(ein) manches Eichhörnchen / many (a) squirrel
(ein) solches Eichhörnchen / such (a) squirrel
welches Eichhörnchen / which, what squirrel
alle Eichhörnchen / all squirrels
</LTable>

<Tip title="All the squirrels">
You may have noticed on the table that _alle_ uses the plural of squirrel, this is because _alle_ is the only indefinite article which can't be used in its singular.
</Tip>

Unlike the three definite articles, indefinite articles have different endings for each combination of gender and case. Luckily for us these endings are regular so indefinite articles share the same endings as _dies-_:

<LTable>
_ / Masculine / Feminine / Neuter / Plural
Nominative / dies**er** / dies**e** / dies**es** / dies*e*
Accusative / dies**en** / dies**e** / dies**es** / dies**e**
Dative / dies**em** / dies**er** / dies**em** / dies**en**
Genitive / dies**es** / dies**er** / dies**es** / dies**er**
</LTable>

<DialogueExample>
squirrel:
  Mein Glanz spiegelt sich in diesen Fenster**n**.
  My shine is reflected in those windows.
</DialogueExample>

Just like with _der_, _die_, _das_, the associated word of the indefinite article, the _der- word_, gets a weak noun ending if necessary, such as _-n_ on dative, plural.

<Tip title="The latter and the former">
_Dieses_ and _jenes_ can also appear as _the latter_ and _the former_ respectively. In this case these are not used like regular articles and don't follow up with its noun.
</Tip>
  `,
  story: [
    // LEVEL 1
    {
      from: "lukas",
      message: "Welche Formen hast du ansonsten angenommen?",
      translation: "What other forms have you taken?",
    },
    {
      from: "squirrel",
      message: "Das ist in euer Dimension schwer zu erklären...",
      translation: "This is difficult to explain in your dimension..."
    },
    {
      from: "squirrel",
      message: "Manche Formen die ich angenommen habe sind Dreidimensional.",
      translation: "Some shapes I have taken are three dimensional."
    },
    {
      from: "squirrel",
      message: "Diese Formen waren Würfel, Zylinder und Kegel.",
      translation: "These shapes were cubes, cylinders and cones."
    },
    {
      from: "squirrel",
      message: "Jede Form fühlt sich für mich aber ganz anders an.",
      translation: "But each shape feels completely different to me."
    },
    {
      question: `What grammatical gender does "Jede Form" have?`,
      choices: [
        { text: "neuter" },
        { text: "masculine" },
        { text: "feminine", correct: true }
      ]
    }
  ],
  exercises: [
    {
      from: "lukas",
      message: `Es war nicht [dieses] Eichhörnchen.`,
      translation: `It wasn't [this] squirrel.`,
      hint: "[neuter]"
    },
    {
      from: "squirrel",
      message: "[Jener] Dieb, das es sich erlaubt hat meine Haselnuss zu nehmen, wird dafür büßen!",
      translation: "[That] thief who took the liberty of taking my hazelnut will pay for it!",
      hint: "[masculine]"
    },
    {
      from: "lindenbaum",
      message: "Die Nachricht wurde über [alle] Frequenzen verteilt.",
      translation: "The message was relayed on [all] frequencies.",
    },
    {
      from: "lukas",
      message: "Ich würde sogar [jeder] Ente Futter geben.",
      translation: "I would even give [every] duck food.",
      hint: "[feminine, dative]"
    }
  ]
})