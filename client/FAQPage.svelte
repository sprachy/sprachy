<script lang="ts">
  import { md } from "../common/sprachdown"
  import _ from "lodash"
  import Sprachdown from "./Sprachdown.svelte"
  import SiteLayout from "./SiteLayout.svelte"

  const faq = md`
# Frequently asked questions

### What's the pricing model?

Sprachy is free to use while it is in early development. After we add sufficient
content, we will likely introduce a subscription fee to do exercises beyond
a certain point. The text of patterns will remain openly accessible, so it'll always
act as a free grammar reference/textbook of sorts.

Since we're just a couple of internet friends and not a VC-backed startup, we're
not really interested in pursuing tech company hypergrowth. It would be nice to make
a decent income from our work, but we don't need to like, launch cars into space
or anything.

We're not interested in ad funding and won't add those, unless it's something actually
useful like job ads for work in Germany or such.

### How do SRS levels work?

Sprachy uses a slightly modified version of the traditional spaced repetition model.
The main difference is that levels do not decrease when you make a mistake; instead,
you can only increase in level after a certain amount of time has passed since the
previous one. You can retry for a level increase immediately if you make a mistake,
except for the final level, which can only be retried every so often.

### Is there an Android or iOS app?

Not yet! If the web version is successful enough and there's interest in
a mobile app, we'll investigate building one.
  `
</script>

<template>
  <SiteLayout title="FAQ">
    <Sprachdown source={faq} />
  </SiteLayout>
</template>
