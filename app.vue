<script setup lang="ts">
import "accessible-nprogress/dist/accessible-nprogress.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "~/assets/app.css"

if (process.client) {
  import("bootstrap")
}
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
