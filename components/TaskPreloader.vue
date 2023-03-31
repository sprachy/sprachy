<script setup lang="ts">
import type { VQATask } from '~/lib/VQATask'
const { speech } = useSprachyApp()

const props = defineProps<{
  task: VQATask
}>()

const emit = defineEmits<{
  (e: 'loaded'): void
}>()

const state = defineState({
  speechLoaded: false,
  imageLoaded: false
})

watchEffect(() => {
  state.speechLoaded = false

  const promises = []

  promises.push(speech.preload({
    from: "narrator",
    message: props.task.question.de,
  }))
  for (const choice of props.task.choices) {
    promises.push(speech.preload({
      from: "narrator",
      message: choice.de,
    }))
  }

  Promise.all(promises).then(() => {
    state.speechLoaded = true
  })
})

watchEffect(() => {
  if (state.speechLoaded && state.imageLoaded) {
    emit('loaded')
  }
})
</script>

<template>
  <div class="preloader">
    <nuxt-img :src="task.imgUrl" @vnodeBeforeMount="state.imageLoaded = false" @load="state.imageLoaded = true" />
  </div>
</template>

<style scoped>
.preloader {
  display: none;
}
</style>
