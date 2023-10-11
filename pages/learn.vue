<script setup lang="ts">
onMounted(() => progressStore.updateCurrentLearnable())
</script>

<template>
  <LearnSidebar />
  <main>
    No tasks??
  </main>
  <!-- <LearnyTimes v-else :user="user!" :allTasks="allTasks" /> -->
</template>

<style scoped></style>
