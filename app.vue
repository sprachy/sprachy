<script setup lang="ts">
import "accessible-nprogress/dist/accessible-nprogress.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "~/assets/app.css"

if (process.client) {
  import("bootstrap")
}

const { data } = await useFetch("/api/whoami")

console.log(data.value?.status)

if (data.value?.status === 'user') {
  await initSPA(data.value.summary)
}
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
