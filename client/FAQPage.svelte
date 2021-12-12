<script lang="ts">
  import { md } from "../common/sprachdown"
  import _ from "lodash"
  import Sprachdown from "./Sprachdown.svelte"
  import SiteLayout from "./SiteLayout.svelte"

  const faq = md`
# Frequently asked questions

### How do SRS levels work?

Sprachy uses a slightly modified version of the traditional spaced repetition model.
The main difference is that levels do not decrease when you make a mistake; instead,
you can only increase in level after a certain amount of time has passed since the
previous one. You can retry for a level increase immediately if you make a mistake,
except for the final level, which can only be retried every so often.
  `
</script>

<template>
  <SiteLayout title="FAQ">
    <Sprachdown source={faq} />
  </SiteLayout>
</template>
