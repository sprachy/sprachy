<script lang="ts" setup>
import "accessible-nprogress/dist/accessible-nprogress.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/app.css"

const { data: patterns } = await useAsyncData('patternIndex', () => sprachdex.fetchPatternIndex())
progressStore.patterns = patterns.value!

onMounted(async () => {
  // Client-side setup

  authStatus.initialize()
  progressStore.loadLocalProgress()
  await Promise.all([
    import("bootstrap"),
    authStatus.refresh(),
    effects.initialize()
  ])
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>