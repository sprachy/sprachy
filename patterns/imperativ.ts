import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "imperativ",
  slug: "imperativ",
  title: "Das Imperativ!",
  shortdesc: "To yell at people to go to sleep!",
  icon: faHandHoldingUsd,
  explanation: md`
Just like in English, the imperative form is used to direct commands or orders at people,
usually followed by an exclamation mark, though optional.

The sentence structure is quite similar to the English imperative form too, the sentences
always begin with a verb, though the verb endings may differ from its original infinitive.

<DialogueExample>
squirrel:
  Bring*e* mir die Mandel!
</DialogueExample>

Generally the verbs are spoken in the 2nd person singular or its plural form. For the 2nd person singular regular verbs can get the -e
suffix added to the stem of the infinitive, though it can also be left out with just the stem, both variants are accepted, although
the stem-only variant wields more power into them!

<Tip title="Where does it stem from?">
  As a reminder the stem words stems from the infinitive with the -en suffix omitted.
</Tip>

But of course there are exceptions to it too.
If a regular verb's stem ends in a _-d_ or _-t_, the e is never omitted.

<DialogueExample>
squirrel:
  Wenn du meine Mandel nicht hast dann...
</DialogueExample>
<DialogueExample>
squirrel:
  Find**e** meine Mandel!
</DialogueExample>

Verbs which experience a vowel change in their conjungation will take that change
and also omit the _-e_ suffix in the imperative form, 
for instance the verb _geben_ takes on the form er/sie/es _gibt_, the imperative form would be _gib_.

<DialogueExample>
squirrel:
  Da dort ist die sie!
</DialogueExample>
<DialogueExample>
squirrel:
  G**i**b mir die Mandel!
</DialogueExample>

The 2nd person plural verbs also retain their present tense form so 


  `,
  stories: [
    // LEVEL 1
  ]
})
