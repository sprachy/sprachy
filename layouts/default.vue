<script setup lang="ts">

withDefaults(defineProps<{
  fixedHeader?: boolean
}>(), {
  fixedHeader: false
})

import SiteHeader from "~/components/SiteHeader.vue"
</script>

<template>
  <div :class="{ fixedHeader }">
    <SiteHeader :fixed="fixedHeader" />
    <slot />
  </div>
</template>

<style scoped>
.fixedHeader {
  padding-top: var(--site-header-height);
}
</style>