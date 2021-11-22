import { definePattern, md } from '../server/definePattern'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'

// ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]

export default definePattern({
  id: 'intro',
  slug: 'intro',
  title: "Einführung",
  icon: faHandSparkles,
  shortdesc: "An introductory lesson, with introductions",
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
      content: md`
<dialogue>
<dline by="">
</dline>

</dialogue>
`
    }
  ]
})