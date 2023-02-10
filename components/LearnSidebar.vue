<script setup lang="ts">
import LevelBar from "./LevelBar.vue"
import LearnDevPanel from "./LearnDevPanel.vue"

const spa = useSprachyApp()
const { dev } = process

const state = useLocalReactive({
  get experience() {
    if (!spa.learning || !("pattern" in spa.learning))
      return null

    return spa.progressByPatternId[spa.learning.pattern.id]?.experience
  }
})

</script>

<template>
  <div class="sidebar">
    <template v-if="spa.learning">
      <div class="overview">
        <div>{{ spa.learning.why }}</div>
        <LevelBar v-if="state.experience && 'pattern' in spa.learning" :key="spa.learning.pattern.id"
          :experience="state.experience" />
        <small v-if="spa.learning.type === 'dialogue'" class="text-secondary">&lt;&lt; Press Enter to continue dialogue
          &gt;&gt;</small>
      </div>
    </template>
    <LearnDevPanel v-if="dev" />
  </div>

</template>

<style>
.sidebar {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  padding: 1rem;
  padding-top: 5rem;
  border-right: 1px solid #ccc;
  z-index: 1;
  background-color: white;
  width: 300px;

  display: flex;
  flex-direction: column;
}
</style>
