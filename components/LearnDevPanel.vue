<script setup lang="ts">
const spa = useSprachyApp()

const state = useLocalReactive({
  openPanel: false
})

async function resetProgress() {
  await spa.reallyResetAllUserProgress()
}

async function skip() {
  spa.skipCurrentLearning()
}

async function advanceTime() {
  spa.devTimeSkip()
}

function togglePanel() {
  state.openPanel = !state.openPanel
}
</script>

<template>
  <div class="devpanel mt-auto">
    <div v-if="state.openPanel" class="card p-4">
      <button class="btn btn-success mt-2" @click="skip">Skip current</button>
      <button class="btn btn-secondary mt-2" @click="advanceTime">Advance time for reviews</button>
      <button class="btn btn-danger mt-2" @click="resetProgress">Reset all progress</button>
    </div>
    <button class="btn" @click="togglePanel">Dev Options</button>
  </div>
</template>