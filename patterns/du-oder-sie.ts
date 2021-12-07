import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { definePattern, md } from '../common/definePattern'

export default definePattern({
  id: 'du-oder-sie',
  slug: 'du-oder-sie',
  title: "Du oder Sie",
  shortdesc: "Casual and formal language",
  icon: faUserTie,
  explanation: md`
German has different ways to say _you_ depending on who you're talking to. In casual conversation, like with friends or family, you can use _du_. When talking to strangers or authority figures, it's common to use _Sie_ instead.

<ltable header="Deutsch / Meaning">
Du bist sehr süß / You are very cute (informal)
Sie sind eine brillante Wissenschaftlerin / You are a brilliant scientist (formal)
</ltable>

Note that _Sie_ when capitalized means the formal you, but the lowercase _sie_ also means "they" or "she". Don't get them mixed up!

<ltable header="Deutsch / Meaning">
Ja, Sie sind richtig / Yes, you are right (formal)
Nein, sie sind keine Kamele / No, they are not camels
Vorsicht, sie ist ein furchtbarer Feind / Beware, she is a fearsome enemy
</ltable>

Similar to "they" in English, the singular _Sie_ and plural _sie_ both use _Sie sind_ like "they are". The "she" meaning of sie uses _sie ist_. This sind/ist difference, along with the casing, can help you figure out from context which of the three meanings is being used.
`,
  exercises: [
    // {
    //   from: 'scientist',
    //   message: 'Sie werden in Kürze [das] erste Proton sehen.',
    //   translation: 'You will see [the] first proton momentarily.',
    //   hint: "[neuter]"
    // },
  ]
})