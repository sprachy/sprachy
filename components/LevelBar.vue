<script setup lang="ts">
// import { tweened } from "svelte/motion"
// import { cubicInOut } from "svelte/easing"
import gsap from 'gsap'

const props = defineProps<{
  experience: number
}>()

const state = defineState({
  shownExp: props.experience,
  prevLevel: levelFromExperience(props.experience),

  get shownLevel() {
    return levelFromExperience(state.shownExp)
  },

  get fracProgress() {
    return (state.shownExp % 1000) / 1000
  }
})

function levelFromExperience(exp: number) {
  return Math.floor(exp / 1000)
}

watchEffect(() => {
  if (state.shownLevel > state.prevLevel) {
    effects.confetti.spawnAt(endpointRef.value!)
    state.prevLevel = state.shownLevel
  }
})

watch(() => props.experience, (exp) => {
  gsap.to(state, { duration: 0.5, shownExp: exp })
})

const endpointRef = ref<HTMLDivElement>()
</script>

<template>
  <div class="d-flex align-items-center">
    <div class="expbar">
      <div class="expbar-fill" :style="{ 'width': `${state.fracProgress * 100}%` }" />
    </div>
    <div class="level ms-2" ref="endpointRef">
      Lv {{ state.shownLevel }}
    </div>
  </div>
</template>

<style scoped>
.expbar {
  position: relative;
  flex-grow: 1;
  height: 15px;
  background: #f5f5f5;
  border-radius: 5px;
  margin: 10px 0;
  display: flex;
}

.expbar-fill {
  position: absolute;
  height: 100%;
  background: #00bcd4;
  border-radius: 5px;
}

.level {
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
