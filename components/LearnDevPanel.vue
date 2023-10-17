<script lang="ts" setup>
const state = defineState({
  openPanel: false,
})

function skip() {
  progressStore.skipCurrentLearnable()
}

function advanceTime() {
  progressStore.devTimeSkip()
}

function resetProgress() {
  progressStore.reallyResetAllUserProgress()
}

function onMaybeClickOutside(e: MouseEvent) {
  if (!(e.target as HTMLElement)?.closest('.devpanel')) {
    state.openPanel = false
  }
}

onMounted(() => {
  window.addEventListener('click', onMaybeClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', onMaybeClickOutside)
})
</script>

<template>
  <div class="devpanel mt-auto">
    <div class="card p-4" v-if="state.openPanel">
      <button class="btn btn-success mt-2" @click="skip">Skip current</button>
      <button class="btn btn-secondary mt-2" @click="advanceTime">Advance time for reviews</button>
      <button class="btn btn-danger mt-2" @click="resetProgress">Reset all progress</button>
    </div>
    <button class="btn" @click="state.openPanel = !state.openPanel">Dev Options</button>
  </div>
</template>
