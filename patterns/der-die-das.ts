import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'der-die-das',
  slug: 'der-die-das',
  title: "Der, die, das",
  shortdesc: "Ah yes, the three genders",
  icon: faVenusMars,
  explanation: md`
Der, die, and das are the three ways of saying _the_ in German. Which one you use depends on the grammatical gender of the noun that follows.

<DialogueExample>
squirrel:
  Hallo, Mensch. **Der Baum** hier ist gemütlich.
  Hello, human. **The tree** here is comfy.
squirrel:
  **Die Leere** empfiehlt diesen Baum sehr.
  **The void** recommends this tree highly.
lukas:
  **Das Eichhörnchen**... redet mit mir?
  **The squirrel** is... talking to me?
</DialogueExample>

Here we can see the noun _Baum_ uses the masculine "der", _Leere_ is the feminine "die", and _Eichhörnchen_ uses the neuter form "das".

There's no thematic or aesthetic reason for this; it's not that trees are particularly manly, or that terrifying voids are particularly girly. That's simply the _grammatical_ gender those nouns happen to have.

However, the genders are not totally _random_ either. We'll learn some patterns later we can use to predict noun gender for certain groups of words.

<Tip>
For plurals, we always use _die_, regardless of the noun's base gender. For example, _der Baum_ becomes _die Bäume_ when talking about mulitiple trees.
</Tip>
`,
  exercises: [
    {
      from: 'scientist',
      message: '[Die] Barriere wird schwächer!',
      translation: '[The] barrier is weakening!',
      hint: "[feminine]"
    },
    {
      from: 'deer',
      message: 'Ist [der] Späher vorbereitet?',
      translation: 'Is [the] scout prepared?',
      hint: "[masculine]"
    },
    {
      from: 'scientist',
      message: 'Sie werden in Kürze [das] erste Proton sehen.',
      translation: 'You will see [the] first proton momentarily.',
      hint: "[neuter]"
    },
  ]
})