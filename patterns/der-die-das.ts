import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'der-die-das',
  slug: 'der-die-das',
  title: "Der, die, das",
  shortdesc: "Ah yes, the three genders",
  icon: faVenusMars,
  explanation: md`
Der, die, and das are the three ways of saying _the_ in German. Which one you use depends on the grammatical gender of the noun that follows. For example:

<plapper-log>
<msg from="lukas">
Das Eichhörnchen ist sehr süß!
The squirrel is very cute!
</msg>

<msg from="squirrel">
S-süß?! Ich bin die Leere zwischen den Leeren, vor denen die Götter fliehen. Ihr narrt auf eure eigene Gefahr, Sterblicher.
Cute?! I am the void between voids from which gods flee. Mock me at your peril, mortal.
</msg>
</plapper-log>

Here we can see the noun _Eichhörnchen_ uses "das", the neuter form, while _Leere_ uses the feminine "die". 

There's no thematic or aesthetic reason for this; it's not that squirrels are particularly androgynous, or that terrifying voids in space are particularly girly. That's simply the _grammatical_ gender those nouns happen to have.

However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.
`,
  exercises: [
    {
      from: 'scientist',
      message: '[Die] Barriere wird schwächer.',
      translation: '[The] barrier is weakening.',
      hint: "[feminine]"
    },
  ]
})