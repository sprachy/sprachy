import { faChartLine } from "@fortawesome/free-solid-svg-icons"
import { definePattern, md } from "../common/definePattern"

export default definePattern({
  id: "besser",
  slug: "besser",
  title: "Das Komparativ",
  shortdesc: "The first form of the comparsion of adjectives",
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
  ],
})