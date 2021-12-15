import { md } from "./sprachdown"

export type Character = {
  id: string
  name: string
  fullname: string
  profile: string
}

const characters = [
  {
    id: "squirrel",
    name: "Töskirelon",
    fullname: "Töskirelon Uferlos Yi",
    profile: md`
An extradimensional squirrel-like lifeform with vast psionic power. Tösky is currently taking a vacation on Earth, a travel destination his mindspace identified as having "gemütliche Bäume" and a pleasant lack of reality-rending esper battles.
    `,
  },
  {
    id: "lukas",
    name: "Lukas",
    fullname: "Lukas Zweidenker",
    profile: md`
A student at a German university, studying science and philosophy. Likes mysterious and odd things. Totally down to hang out with an alien squirrel.
    `,
  },
  {
    id: "scientist",
    name: "Lindenbaum",
    fullname: "Fräulein Lindenbaum",
    profile: md`
TODO
    `,
  },
  {
    id: "deer",
    name: "???",
    fullname: "???",
    profile: md`
TODO
    `,
  },
  {
    id: "cashier",
    name: "Cashier",
    fullname: "Cashier",
    profile: md`
A local supermarket cashier. She has no idea that fuzzy eldritch entities are browsing the snack aisle.
    `,
  },
]

export default characters
