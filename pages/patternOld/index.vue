<script setup lang="ts">
import _ from "lodash"
import PatternExplanation from "~/components/PatternExplanation.vue"
import { Pattern } from "~/lib/Pattern"
import { sprachdex } from "~/lib/sprachdex"

// definePageMeta({
//   layout: "pattern"
// })

// TODO: deduplicate with layout

const route = useRoute()
</script>

<template>
  <ContentDoc :path="`/${route.params.pattern}`" />
</template>
