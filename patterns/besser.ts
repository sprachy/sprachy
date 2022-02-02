import { faChartLine } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "besser",
  slug: "besser",
  title: "Das Komparativ",
  shortdesc: "For when you have a way better idea",
  icon: faChartLine,
  explanation: md`
Just like in English you can use comparsion to express that something is better. For now we're going to focus on the first degree of comparsions which is the _comparative_.

<ltable translate header="Positive / Comparative">
klein / kleiner
gut / besser
lecker / leckerer
</ltable>

The pattern is straightforward so you can always expect a comparative to end in _-er_. Keep in mind though that some adjectives already end in _-er_ just how we noticed on _lecker_, we simply add another _-er_ then.

You also have to keep the correct adjective endings in mind. If an adjective is in front of a masculine noun like in _kleiner Baum_, it already uses an _-er_ ending which wouldn't be the comparative. To make the adjective a comparative you simply concatenate another _-er_ and you get _kleinerer Baum_. The adjective ending always appears after the comparative ending.

<Tip title="Umlaut">
It's also common thing for comparatives to use the Umlaut of _a_, _o_ and _u_ for example _groß_ would turn into _größer_, keep in mind though that there are many exceptions to it,
</Tip>`,
  stories: [

    // LEVEL 1
    {
      lines: [
        {
          from: "squirrel",
          message: "Erdnüsse? Was für eine schandhafte Auswahl! Das kannst du [besser]!",
          translation: "Peanuts? What a shameful choice! You could do [better]!",
          hint: "[gut]",
        },
        {
          from: "lukas",
          message: "Was fändest du denn [leckerer]?",
          translation: "What would you find [tastier]?",
          hint: "[lecker]",
        },
        {
          from: "squirrel",
          message: "Ich ernähre mich von Mandeln. Die Juwelen der Natur. Jedoch sind eure [kleiner] als in meiner Welt.",
          translation: "I feed on almonds. The jewels of nature. However, yours are [smaller] than in my world.",
          hint: "[klein]",
        },
        {
          from: "squirrel",
          message: "Auf euren Mandelbäumen ist es aber wie im Schlaraffenland, hier ist es [ruhiger] ohne die ganzen lauten Esperkämpfer.",
          translation: "Though on your almond trees it's like in the land of plenty, here it's [quieter] without all the noisy esper warriors.",
          hint: "[ruhig]",
        },
      ]
    },
    {
      lines: [
        {
          from: "fox",
          message: "Was ist [besser]? Kaffee oder Tee?",
          translation: "What's [better]? Coffee or tea?"
        },
        {
          from: "lindenbaum",
          message: "Besser? Das hängt vom Kontext ab.",
          translation: "Better? It depends on context."
        },
        {
          from: "lindenbaum",
          message: "Kaffee schmeckt [bitterer] und enthält mehr Koffein.",
          translation: "Coffee tastes [bitterer] and has more caffeine.",
          hint: "[bitter]"
        },
        {
          from: "lindenbaum",
          message: "Tee schmeckt [milder] und enthält den beruhigenden Stoff, L-Theanin.",
          translation: "Tea tastes [milder] and contains a calming chemical, L-Theanine.",
          hint: "[mild]"
        },
        {
          from: "lindenbaum",
          message: "Ich persönlich mag Kaffee [lieber].",
          translation: "I personally like coffee more.",
          hint: "[lieb]"
        },
        {
          from: "fox",
          message: "Hmm, also ist Kaffee besser.",
          translation: "Hmm, so coffee is better.",
        },
        {
          from: "lindenbaum",
          message: "Nur, wenn du persönlich entscheidest, was du mir geben willst.",
          translation: "Only if you're deciding which to give me, personally."
        },
        {
          from: "fox",
          message: "Aber Lin ist [wichtiger] als andere Menschen.",
          translation: "But Lin is [important] than other humans.",
          hint: "[wichtig]"
        },
        {
          from: "fox",
          message: "Deine Präferenz hat also ein [höheres] Gewicht im Gesamtumfang.",
          translation: "So your preference carries [higher] weight in global scope.",
          hint: "[hohe, neuter]"
        },
        {
          from: "lindenbaum",
          message: "Aha! Ich registriere das immer noch als Analysefehler, aber es ist ein sehr süßer Fehler.",
          translation: "Hah! I'm still recording this as an analysis bug, but it's a very sweet one."
        }
      ]
    },
  ],
})