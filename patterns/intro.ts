import { definePattern, md } from '../common/definePattern'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'

export default definePattern({
  id: 'intro',
  slug: 'intro',
  title: "Hallo",
  icon: faHandSparkles,
  shortdesc: "An introductory lesson, with introductions",
  explanation: md`
Welcome to Sprachy! As is traditional with learning languages, let's start
by learning how to introduce yourself.

<dialogue>
<dline by="lukas">
Hallo! Ich heiße Lukas. Deutsch ist meine Muttersprache.
Hello! I'm called Lukas. German is my native language.
</dline>

<dline by="anna">
Guten Morgen. Mein Name ist Anna. Ich lerne gerne Deutsch.
Good morning. My name is Anna. I like to learn German.
</dline>

<dline by="squirrel">
Grüße. Ich bin Töskirelon, Meister der Neunten Esper-Kunst und Imperator der unendlichen Ebene von Yi.
Greetings. I am Töskirelon, Master of the Ninth Esper Art and Imperator of the Infinite Plane of Yi.
</dline>
</dialogue>

Like most languages, German has a variety of words with similar meanings that have subtle differences in tone, formality, or regional usage. Here are a few different ways to say hello!

<ltable header="Deutsch / Meaning">
Hallo / Hello
Hallihallo / Hello hello
Guten Morgen / Good morning
Guten Abend / Good evening
Grüße / Greetings (formal)
Hallöchen / Hii~ (cutely)
Moin! / Wishing the other something nice, popular in Northern Germany
Moin moin! / Same as Moin but signaling the other you want to smalltalk
</ltable>
`,
  exercises: [
    {
      content: md`
<dline by="lukas">
Aww [hallöchen] kleines Eichhörnchen!
Aww [hi] little squirrel!
</dline>
`,
      hint: "[cutely]"
    }
  ]
})