import { definePattern, md } from '../server/patternDef'

export default definePattern({
  id: 'die-der-das',
  slug: 'die-der-das',
  title: "Die, der, das",
  explanation: md`
Die, der, and das are the three ways of saying _the_ in German. Which one you use depends on the grammatical gender of the noun that follows. For example:

<dialogue by="boy">
Das Eichhörnchen ist sehr süß!
The squirrel is very cute!
</dialogue>

<dialogue by="squirrel">
S-süß?! Ich bin die Leere zwischen Leeren, aus der Götter fliehen. Verspotte mich auf deine Gefahr.
Cute?! I am the void between voids from which gods flee. Mock me at your peril.
</dialogue>

Here we can see the noun _Eichhörnchen_ uses "das", the neuter form, while _Leere_ uses the feminine "die". 

There's no thematic or aesthetic reason for this; it's not that squirrels are particularly androgynous, or that terrifying voids in space are particularly girly. That's simply the _grammatical_ gender those nouns happen to have.

However, the genders are not totally _random_ either. All nouns using the diminutive form _-chen_ are neuter and use _das_. We'll learn various other patterns like this we can use to help predict noun gender!
`,
  exercises: [
    {
      content: "[Die] Katze",
      translation: "[The] cat"
    }
  ]
})