<script setup lang="ts">
import type { VQATask } from '~/lib/VQATask'
const { speech } = useSprachyApp()

const props = defineProps<{
  task: VQATask
}>()

onBeforeMount(() => {
  speech.preload({
    from: "narrator",
    message: props.task.question.de,
  })
  for (const choice of props.task.choices) {
    speech.preload({
      from: "narrator",
      message: choice.de,
    })
  }
})
</script>

<template>
  <div class="preloader">
    <nuxt-img :src="task.imgUrl" />
  </div>
</template>

<style scoped>
.preloader {
  display: none;
}
</style>
