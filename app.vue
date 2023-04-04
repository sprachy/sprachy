<script setup lang="ts">
import "accessible-nprogress/dist/accessible-nprogress.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "~/assets/app.css"

if (process.client) {
  import("bootstrap")
}
</script>

<template>
  <GlobalErrorHandler>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </GlobalErrorHandler>
</template>
