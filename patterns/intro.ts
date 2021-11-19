import { definePattern, md } from '../server/patternDef'

export default definePattern({
  id: 'intro',
  slug: 'intro',
  title: "Introduction",
  explanation: md`
Welcome to Sprachy!

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
Grüße. Ich bin Töskirelon, Meister der Neunten Esperkunst und Imperator der unendlichen Ebene von Yi.
Greetings. I am Töskirelon, Master of the Ninth Esper Art and Imperator of the Infinite Plane of Yi.
</dline>
</dialogue>

`,
  exercises: [
    {
      content: "[Die] Katze",
      translation: "[The] cat"
    }
  ]
})