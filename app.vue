<script lang="ts" setup>
import "accessible-nprogress/dist/accessible-nprogress.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/app.css"

const { data: patterns } = await useAsyncData('patternIndex', () => fetchPatternIndex())
progressStore.patterns = patterns.value!
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>