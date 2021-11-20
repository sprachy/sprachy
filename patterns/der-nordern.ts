import { definePattern, md } from '../server/definePattern'

export default definePattern({
  id: 'der-nordern',
  slug: 'der-nordern',
  title: "Der nordern",
  explanation: md`
Die, der, and das are the three ways of saying _the_ in German. Which one you use depends on the grammatical gender of the noun that follows. For example:

der Kernfusionsreaktor
the nuclear fusion reactor

What does it mean that a nuclear fusion reactor is masculine? Well, it doesn't really mean anything! There are a few patterns we'll learn later that can help us predict the gender for certain kinds of nouns, but generally for inanimate objects it's just totally arbitrary. It's just a boy reactor, somehow.  
`,
  exercises: [
    {
      content: "[Die] Katze",
      translation: "[The] cat"
    }
  ]
})