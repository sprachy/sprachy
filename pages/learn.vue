<script setup lang="ts">
definePageMeta({
  needsUser: true
})

const user = await getCurrentUser()
const allTasks = await api.getTasks()

</script>

<template>
  <main v-if="!allTasks.length">
    No tasks??
  </main>
  <LearnyTimes v-else :user="user!" :allTasks="allTasks" />
</template>

<style scoped></style>
