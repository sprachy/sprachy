import { faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

// TODO: Probably some interesting social subtleties about gender that are worth discussing here (non-binary people?)

export default definePattern({
  id: "der-lerner-die-lernerin",
  slug: "gender-people",
  title: "Der Lerner, die Lernerin",
  shortdesc: "Apparently humans have genders too",
  icon: faVenusMars,
  explanation: md`
How does grammatical gender interact with the actual gender of individual ~~humans~~ sapient entities? Often, a noun that refers to a type of person will have both a masculine and a feminine form.

<ltable header="Masculine / Feminine / Meaning">
der Mann / die Frau / the man/woman
der Student / die Studentin / the university student
der Arzt / die Ärztin / the doctor
der Paläoastrobiologe / die Paläoastrobiologin / the paleoastrobiologist
</ltable>

Pretty straightforward! Not all person words follow this pattern, though. For example, _das Mädchen_ is always neuter as a _-chen_ word, even though it refers specifically to girls. Similarly, _die Person_ and _der Mensch_ are feminine and masculine respectively, even though they both just refer to people in general.


  `,
  story: [
    {
      from: "squirrel",
      message: "Lukas, bist du [ein] Student?",
      translation: "Lukas, are you [a] uni student?",
    },
    {
      from: "lukas",
      message: "Ja. [Meine] Biologieprofessorin würde Sie gerne mal sehen.",
      translation:
        "Yes. [My] biology professor would love to get a look at you.",
    },
    {
      from: "lukas",
      message: "Was bist du auf deiner Welt?",
      translation: "What are you on your world?",
    },
    {
      from: "squirrel",
      message: "Etwas wie... [ein] Prinz?",
      translation: "Something like... [a] prince?",
    },
    {
      from: "squirrel",
      message: "[Die] Buchhalterin war nicht sehr glücklich darüber, dass ich gegangen bin.",
      translation: "[The] accountant was not very happy I left.",
    },
  ],
  exercises: [
    {
      from: "squirrel",
      message: "[Die] Zahnärztin schimpfte mich aus, weil ich zu viel an Schwertern genagt hatte.",
      translation: "[The] dentist told me off for chewing on swords too much.",
    },
    {
      from: "lukas",
      message: "[Der] Astrobiologe muss traurig sein, denn der Himmel antwortet nie. Ich wünschte, ich könnte Sie mit ihm bekannt machen.",
      translation: "[The] astrobiologist must be sad, since the sky never answers. I wish I could introduce you to him."
    },
    {
      from: "lindenbaum",
      message: "Es stimmt, dass [der] Biologe mehr über sein Fachgebiet weiß. Aber ich habe eine Quanten-KI.",
      translation: "It's true that [the] biologist knows more about his field. But I have a quantum AI.",
    },
    {
      from: "fox",
      message: "[Der] Gamer trägt gerne ein Blaufuchskostüm.",
      translation: "[The] gamer likes to wear a blue fox costume."
    }
  ]
})


    // LEVEL 2
    // {
    //   lines: [
    //     {
    //       from: "lindenbaum",
    //       message: "Ich bin [eine] Quanteninformationstheoretikerin. Und jetzt viele andere Dinge, mit Hilfe der KI.",
    //       translation: "I am [a] quantum information theorist. And now many other things, with the help of AI."
    //     },
    //     {
    //       from: "fox",
    //       message: "Ich bin [der] größte Komiker. Bitte genießen Sie meine handgefertigten Memes.",
    //       translation: "I am [the] greatest comedian. Please enjoy my handcrafted memes."
    //     },
    //     {
    //       from: "fox",
    //       message: "...und ich helfe Lin als [ein] persönlicher Assistent, nehme ich an.",
    //       translation: "...and I help Lin as a personal assistant, I suppose."
    //     },
    //     {
    //       from: "leonie",
    //       message: "Ich bin [eine] Ökologin und Botschafterin der Artenvielfalt. Seltsame Kreaturen sind so wunderbar!",
    //       translation: "I am [an] ecologist and interspecies ambassador. Strange creatures are so wonderful!"
    //     },
    //     {
    //       from: "nils",
    //       message: "Hallo! Ich bin zehn!",
    //       translation: "Hello! I'm ten!"
    //     },
    //   ]
    // }