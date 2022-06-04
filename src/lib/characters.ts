import { md } from "./util"
import lukas from "$lib/img/lukas.webp"
import anna from "$lib/img/anna.webp"
import squirrel from "$lib/img/squirrel.webp"
import lindenbaum from "$lib/img/scientist.webp"
// import deer from "$lib/img/deer.webp"
import cashier from "$lib/img/cashier.webp"
import mirror from "$lib/img/mirror.webp"
import explorer from "$lib/img/explorer.webp"
import robot from "$lib/img/robot.webp"
import reporter from "$lib/img/reporter.webp"
import fish from "$lib/img/fish.webp"
import dog from "$lib/img/dog.webp"
import leonie from "$lib/img/leonie.webp"
import nils from "$lib/img/nils.webp"
import fox from "$lib/img/fox.webp"
import harald from "$lib/img/harald.webp"
import klaus from "$lib/img/klaus.webp"
import type { VoiceSynthesisRequestSchema } from "src/routes/api/synthesize"

export type Character = {
  id: string
  name: string
  avatar: string
  fullname: string
  profile?: string
  audio?: {
    voice: Partial<VoiceSynthesisRequestSchema["voice"]>,
    audioConfig?: Partial<VoiceSynthesisRequestSchema["audioConfig"]>
  }
}

const characters: Character[] = [
  {
    id: "narrator",
    avatar: squirrel,
    name: "Narrator",
    fullname: "Narrator"
  },

  /**
   * ESPER POWERS AND HOW THEY WORK
   * 
   * Imagine the universe as a sheet of paper. Espers are like tiny moths that sit on the
   * paper, with their main (3-dimensional) body being like the footprint of their main feet. They
   * can manipulate objects in the world in the same way that you might move things around on
   * a (very big and heavy) board.
   * 
   * The relative power level of espers comes from the size of their extradimensional presence / "wings"
   * and their skill at precisely poking the universe. Because the part of their body
   * with the additional dimension is exponentially larger, they have to eat a lot and are 
   * limited in their extradimensional mass. (imagine trying to build an entire body out of ink)
   * 
   * It's much easier for an esper to alter or destroy things than to create them de novo.
   * Töski can draw an apple in the universe and get something vaguely apple-shaped, but it
   * would be very hard to make it taste like an apple or otherwise behave like one chemically: he 
   * would need great precision in drawing all the little molecules. In this way, skilled espers
   * are similar to skilled technical artists or sculptors.
   * 
   * Espers can imbue objects with behavior (like Töski's mirror) by attaching an extradimensional
   * organism (a pet? a part of their own brain?) to them. The object becomes like a puppet pulled by
   * little strings from outside the universe.
   * 
   * Espers can "teleport" by jumping off the universe and landing somewhere else. It's
   * not instantaneous, but it's pretty fast especially for a strong esper. Travel between 
   * universes works similarly but is more difficult/dangerous, and something only really
   * strong espers can do by themselves.
   */

  /**
   * Töski comes from a "jungle universe": one where the cosmology and physics are particularly 
   * conducive to life. Creatures like Töski evolved to grow a partly-extradimensional body as
   * a solution to the extremely evolutionarily competitive environment. Sapient espers can take 
   * this much further and intentionally practice extradimensional abilities as a kind of (martial) 
   * art.
   * 
   * Töski's society is dominated by the most powerful esper families, in a kind of pseudo-feudal
   * structure. They view their role in society as one of both power and responsibility. Originally
   * this arrangement was based on the need for powerful leaders to protect the people from the
   * potentially extremely hostile, jungle-like (psychic) wildlife and other threats. 
   * 
   * In modern times, the squirrels have more-or-less tamed their local environment through the use
   * of semi-sapient imbued devices and other means. The esper families have a more ritual and
   * economic role, and it is in this sense that Töski is considered a prince. Though a
   * powerful esper in his own right, he's not a fan of the obligations this role entails,
   * especially the (often violent) challenges from rival princes.
   * 
   * Something notable about esper-squirrel society (and jungle universes in general)
   * is that they do not really have "science" in the sense that humans do. This is because
   * the underlying physics and chemistry is so bewilderingly complex; at the scale we
   * might have molecules, they have entire ecosystems. It's very hard to figure out anything
   * precise and mathematical on the microscale, so espers work more like artists.
   * 
   * I'm not sure what topology Töski's universe has yet. He doesn't live on a planet in any
   * traditional sense, but rather some other natural delineation of matter-rich space that
   * doesn't rely on vacuum boundaries.
   * 
   * To Töski, having grown up in a much more life-rich universe, Earth looks like a peaceful 
   * island in a huge, empty ocean. It's similar to how we would think of the Galápagos or
   * other island biogeographies: life on Earth is kind of bizarre and charming, having evolved
   * in relative isolation compared to the vaster chaos of his home universe.
   */
  {
    id: "squirrel",
    avatar: squirrel,
    name: "Töskirelon",
    fullname: "Töskirelon Uferlos Yi",
    profile: md`
An extradimensional squirrel-like lifeform with vast psionic power. Töski is currently taking a vacation on Earth, a travel destination his mindspace identified as having "gemütliche Bäume" and a pleasant lack of reality-rending esper battles.
    `,

    audio: {
      voice: {
        name: "de-DE-Standard-F",
        ssmlGender: "FEMALE"
      },
      audioConfig: {
        speakingRate: 1.4,
        pitch: 8,
        volumeGainDb: 2.0
      }
    }
    // rate: 1.05,
    // pitch: 1.5
  },

  /**
   * Lukas is the Human Viewpoint Character. As a somewhat shy outsider to human society himself, he
   * is particularly well-placed to befriend aliens and try to explain the oddness of humans to them.
   * This gives as an interesting context to use a lot of everyday German words and language, as well
   * as funny situations caused by e.g. taking psychic squirrels to grocery stores.
   */
  {
    id: "lukas",
    name: "Lukas",
    avatar: lukas,
    fullname: "Lukas Zweidenker",
    profile: md`
A student at a German university, studying science and philosophy. He likes tea and fluffy things. Totally down to hang out with an alien squirrel.
    `,
    audio: {
      voice: {
        name: "de-DE-Wavenet-B",
        ssmlGender: "MALE"
      },
      audioConfig: {
        speakingRate: 1.2,
        pitch: 2
      }
    }
  },
  {
    id: "lindenbaum",
    name: "Lindenbaum",
    avatar: lindenbaum,
    fullname: "Fräulein Lindenbaum",
    profile: md`
A highly energetic high-energy physicist. She works singlemindedly towards a certain goal, alongside mysterious allies.
    `,
  },
  {
    id: "fox",
    name: "Schlaufuchs",
    avatar: fox,
    fullname: "Schlaufuchs",
    profile: md`
An advanced artificial intelligence created by Lindenbaum. This young and mischevous entity represents himself with a fox avatar.
    `,
  },
  {
    id: "cashier",
    name: "Cashier",
    avatar: cashier,
    fullname: "Cashier",
    profile: md`
A local supermarket cashier. She has no idea that fuzzy eldritch entities are browsing the snack aisle.
    `,
  },
  {
    id: "mirror",
    name: "Mirror",
    avatar: mirror,
    fullname: "Mirror",
    profile: md`
Töski's mirror. Töski brought this seemingly inanimate object to life using esper powers.
    `,
  },

  /**
   * I'm not certain what this person is up to yet. Might be related to Lindenbaum's schemes.
   * They emerged from a dream I had about a fish.
   */
  {
    id: "explorer",
    name: "Explorer",
    avatar: explorer,
    fullname: "Explorer",
    profile: md`
An interplanetary explorer. Seems to be searching for something among the ruins of fallen civilizations.
    `,
  },
  {
    id: "robot",
    name: "Ancient Robot",
    avatar: robot,
    fullname: "Ancient Robot",
    profile: md`
An ancient traffic law enforcement robot. Somehow still operating despite the city it serves being long abandoned.
    `,
  },
  {
    id: "reporter",
    name: "Reporter",
    avatar: reporter,
    fullname: "Reporter",
    profile: md`
A reporter covering science news. He doesn't _really_ know what he's talking about, but he tries his best.
    `,
  },
  {
    id: "fish",
    name: "Fish",
    avatar: fish,
    fullname: "Fish",
    profile: md`
A small diadromous fish-like organism. It's not entirely clear if it's intelligent or self-aware.
    `,
  },
  {
    id: "dog",
    name: "Dog",
    avatar: dog,
    fullname: "Dog",
    profile: md`
A local house pet and good boy. Prepared to sacrifice his life in defense of his family, if need be.
    `,
  },
  {
    id: "leonie",
    name: "Leonie",
    avatar: leonie,
    fullname: "Leonie Köhler",
    profile: md`
A volunteer at the local dragon reserve. She is patient and fond of nature.
    `,
  },
  {
    id: "nils",
    name: "Nils",
    avatar: nils,
    fullname: "Nilkorozog the Incorrigible",
    profile: md`
A young dragon who lives on the dragon reserve. He recently developed an interest in human languages and culture.
    `,
  },
  {
    id: "anna",
    name: "Anna",
    avatar: anna,
    fullname: "Anna Zweidenker",
    profile: md`
An outgoing young professional, and Lukas' older sister. She likes to tease him.
    `,
  },
  {
    id: "harald",
    name: "Harald",
    avatar: harald,
    fullname: "Harald Federstrauß",
    profile: md`
An old man who has recently discovered his hobby in writing, though he might be a bit too overconfident.
    `,
  },
  {
    id: "klaus",
    name: "Klaus",
    avatar: klaus,
    fullname: "Klaus Maus",
    profile: md`
It's Harald's little rat companion, though Harald refuses to acknowledge that and considers him a mouse just so he can keep up with the rhyming name.
    `,
  }
]

export default characters
