<script setup lang="ts">
import _ from "lodash"
import PatternExplanation from "~/components/PatternExplanation.vue"
import { Pattern } from "~/lib/Pattern"
import { sprachdex } from "~/lib/sprachdex"

definePageMeta({
  layout: "pattern"
})

// TODO: deduplicate with layout

const route = useRoute()
const pattern = sprachdex.publishedPatterns.find(
  (p) => p.slug === route.params.pattern
)

if (!pattern) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pattern not found",
  })
}
</script>

<template>
  <!-- <PublicPage
  title={pattern.title}
  canonicalPath={`/${pattern.slug}`}
  cardDesc={pattern.shortdesc}
> -->
  <PatternExplanation :pattern="pattern" />
  <!-- </PublicPage> -->
</template>
