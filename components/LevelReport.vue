<script setup lang="ts">
import { Ref } from "vue"
import type { PatternId } from "~/lib/Pattern"
import LevelReportItem from "./LevelReportItem.vue"

const props = defineProps<{
  experienceByPatternId: Record<PatternId, number>
}>()

const emit = defineEmits<{
  (event: "animEnd"): void
}>()

const { patternsAndProgress } = useSprachyApp()

const itemRefs = [] as Ref<typeof LevelReportItem>[]

const state = useLocalReactive({
  get gainingPatterns() {
    return patternsAndProgress.filter((p) => p.id in props.experienceByPatternId)
  },

  get items() {
    return this.gainingPatterns.map((p) => {
      const experience = props.experienceByPatternId[p.id]!
      return {
        title: p.title,
        expStart: p.progress.experience - experience,
        expGained: experience,
      }
    })
  }
})
</script>

<template>
  <div>
    <table>
      <LevelReportItem v-for="item in state.items" v-bind="item" ref="itemRefs[i]" @animEnd="emit('animEnd')" />
    </table>

    <!-- <button class="btn btn-debug" on:click={testProgress}>Test</button> -->
  </div>
</template>

<style scoped>
table {
  max-width: 800px;
  margin: auto;
}
</style>
