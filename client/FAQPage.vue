<template>
  <site-layout>
    <sprachdown :content="faq" />
  </site-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { md } from "../common/sprachdown"
import _ from "lodash"

@Component({
  metaInfo() {
    return {
      title: "FAQ - Sprachy",
    }
  },
})
export default class LearnPage extends Vue {
  noNewPatterns: boolean = false

  get faq() {
    return md`
# Frequently asked questions

### How do SRS levels work?

Sprachy uses a slightly modified version of the traditional spaced repetition model.
The main difference is that levels do not decrease when you make a mistake; instead,
you can only increase in level after a certain amount of time has passed since the
previous one. You can retry for a level increase immediately if you make a mistake,
except for the final level, which can only be retried every so often.
    `
  }
}
</script>

<style lang="sass">
tr
  cursor: pointer
</style>
