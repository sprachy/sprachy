import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "$lib/definePattern"

export default definePattern({
  id: "imperativ",
  slug: "imperativ",
  title: "Das Imperativ!",
  shortdesc: "To yell at people to go to sleep!",
  icon: faExclamation,
  explanation: md`
Just like in English, the imperative form is used to direct commands or orders at people,
usually followed by an exclamation mark, though optional.

<LTable>
_ / Masculine / Feminine / Neuter
infnitive / schlafen / geben / anfangen
2nd person singular / **schlaf** / **gib** / **fang**
2nd person plural / **schlafen** / **geben** / **fangen**
</LTable>

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
  The same word stems from the infinitie where both the suffix and prefix are removed, usually the suffix
  consists of the _-en_ ending.
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

Now we continue with the second most usual occurance of the imperative: The 2nd person plural.
In this case the present tense form is used for the verb and you don't have to worry about the word's stem.

<DialogueExample>
lukas:
  Kommt her ihr Eichörnchen.
</DialogueExample>

<Tip title="Und Sie?">
  The formal spelling of _you_ as in _Sie_ also accounts to 2nd person plural and follows the same rules with the addition
  that the _Sie_ always follows the first verb in the imperative form.
</Tip>

The imperative form can also be used for the 1st person plural, in this case the verb uses the present tense.

<DialogueExample>
lukas:
  Gehen wir zum Park!
</DialogueExample>
`
  ,
  story: [
    {
      from: "lindenbaum",
      message: "Dann [fangen] wir mal an!",
      translation: "Well then let's [begin]!",
      hint: "[anfangen]",
    },
    {
      from: "lindenbaum",
      message: "[Gib] mir die Koordinaten der Gravitationsanomalie!",
      translation: "[Give] me the coordinates for the gravitational anomaly!",
      hint: "[geben]",
    },
    {
      from: "fox",
      message: "Gravitationsanomalie ist in Sichtweite.",
      translation: "Gravitational anomaly is in view.",
    },
    {
      from: "lindenbaum",
      message: "[Zoom] näher heran.",
      translation: "[Zoom] closer in.",
      hint: "[zoomen]",
    },
    {
      from: "lindenbaum",
      message: "Okay... [bleib] da!",
      translation: "Okay... [stay] there.",
      hint: "[bleiben]",
    },
    {
      from: "lindenbaum",
      message: "[Analysiere] die chemischen Eigenschaften des Objektes.",
      translation: "[Analyze] the chemical properties of this object.",
      hint: "[analysieren]",
    },
    {
      from: "fox",
      message: "Es besteht hauptsächlich aus Kohlenstoff, mit einen kleineren Anteil an Calcium, Magnesium, Eisen und Aluminium.",
      translation: "It primarily consists of carbon, with a smaller distribution of calcium, magnesium, iron and aluminium.",
    },
    {
      from: "lindenbaum",
      message: "Also organisch! Schlaufuchs, [initiiere] einen Scan auf biologischen Eigenschaften.",
      translation: "So it is organic! Schlaufuchs, [initiate] a scan on biological properties.",
      hint: "[initiieren]",
    },
    {
      from: "fox",
      message: "Es scheint ein Teil eines Organs zu sein, das absichtlich abgeworfen wurde.",
      translation: "It seems to be a part of an organ which was intentionally discarded.",
    },
    {
      from: "lindenbaum",
      message: "[Nimm] eine mikroskopische Analyse des Organs auf.",
      translation: "[Take] on a microscopic analysis of the organ.",
      hint: "[nehmen]",
    },
    {
      from: "fox",
      message: "Die Struktur erscheint mir als unbekannt.",
      translation: "The structure doesn't seem familiar",
    },
    {
      from: "lindenbaum",
      message: "[Transferiere] die Daten zum LIGO server. Diese soll es dann auswerten.",
      translation: "[Transfer] the date to the LIGO server. This should then evaluate it.",
      hint: "[transferieren]",
    },
  ],
  exercises: [
    {
      from: "squirrel",
      message: "[Mach] deinen Zug, Mensch!",
      translation: "[Make] your move, human!",
      hint: "[machen]",
      explanation: `This is a command for someone to do something, so it's imperative form. Verbs in imperative form tend to use their stem form with no prefix or suffix, so _machen_ becomes _mach_.`
    },
    {
      from: "lukas",
      message: "Töski, bitte [iss] nicht die Schachfiguren.",
      translation: "Töski, please don't [eat] the chess pieces.",
      hint: "[essen]",
    },
    {
      from: "fox",
      message: "[Sprich] nie wieder mit mir oder meinem Sohn.",
      translation: "Don't [talk] to me or my son ever again.",
      hint: "[sprechen]"
    }
  ]
})