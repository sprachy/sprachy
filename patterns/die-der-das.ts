import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'die-der-das',
  slug: 'die-der-das',
  title: "Die, der, das",
  shortdesc: "Ah yes, the three genders",
  icon: faVenusMars,
  explanation: md`
Die, der, and das are the three ways of saying _the_ in German. Which one you use depends on the grammatical gender of the noun that follows. For example:

<dline by="lukas">
Das Eichhörnchen ist sehr süß!
The squirrel is very cute!
</dline>

<dline by="squirrel">
S-süß?! Ich bin die Leere zwischen Leeren, aus der Götter fliehen. Ihr narrt auf eure eigene Gefahr, sterblicher.
Cute?! I am the void between voids from which gods flee. Mock me at your peril, mortal.
</dline>

Here we can see the noun _Eichhörnchen_ uses "das", the neuter form, while _Leere_ uses the feminine "die". 

There's no thematic or aesthetic reason for this; it's not that squirrels are particularly androgynous, or that terrifying voids in space are particularly girly. That's simply the _grammatical_ gender those nouns happen to have.

However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.
`,
  exercises: [
    {
      content: md`
<dline by="lukas">
Ich mag [die] Katze.
I like [the] cat.
</dline>
`
    }
  ]
})