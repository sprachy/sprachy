<script lang="ts" setup>
import "accessible-nprogress/dist/accessible-nprogress.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/app.css"

onMounted(() => {
  authStatus.refresh()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>