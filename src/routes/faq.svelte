<script lang="ts">
  import { md } from "$lib/sprachdown"
  import _ from "lodash"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import SiteLayout from "$lib/SiteLayout.svelte"

  const faq = md`
# Frequently asked questions

### How do the levels work?

Sprachy is a kind of [spaced repetition system](https://en.wikipedia.org/wiki/Spaced_repetition) for learning German.
You can unlock the next level of a pattern a certain number of hours/days after completing the previous level.

For now, levels never decrease, and you can always retry a level if you make a mistake.
We may later add higher levels with more challenging exercises, which require
consitent accuracy or speed to pass.

### What will the pricing model be?

Sprachy is free to use while it is in early development. After we add sufficient
content, we'll likely introduce a subscription fee to do exercises beyond
a certain point. The text of patterns will remain openly accessible, so it'll always
act as a free grammar reference/textbook of sorts.

Since we're just a couple of internet friends and not a VC-backed startup, we're
not really interested in pursuing tech company hypergrowth. It would be nice to make
a decent income from our work, but we don't need to like, launch cars into space
or anything.

We're not interested in ad funding and won't add those, unless it's something actually
useful like job ads for work in Germany or such.

### Is there an Android or iOS app?

Not yet! If the web version is successful enough and there's interest in
a mobile app, we'll investigate building one.

### Who made this?

Sprachy is made by [Toggle](https://github.com/tgle) and [Twokay](https://github.com/two-kay)!
Toggle wanted to learn German, and it's Twokay's native language, so we decided to team up
and make a fancy website for it!
  `
</script>

<template>
  <SiteLayout title="FAQ">
    <div class="faq">
      <Sprachdown source={faq} />
    </div>
  </SiteLayout>
</template>

<style lang="sass">
.faq :global(h3)
  margin-top: 1.5rem
  margin-bottom: 0.5rem
  font-size: 1.4rem
</style>
