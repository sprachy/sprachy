<script setup lang="ts">
import ExerciseView from "~/components/ExerciseView.vue"
import type { Pattern } from "~/lib/Pattern"

const spa = useSprachyApp()
const { user, speech } = spa

const props = withDefaults(
  defineProps<{
    pattern: Pattern,
    expMultiplier?: number
  }>(), {
  expMultiplier: 1.0
})

const emit = defineEmits<{
  (e: "complete"): void
}>()

const state = defineState({
  startLevel: -1,
  exerciseIndex: 0,

  get progress() {
    return spa.progressByPatternId[props.pattern.id]
  },

  get exercises() {
    return props.pattern.exercises
  },

  get exercise() {
    return state.exercises[state.exerciseIndex]
  }
})

watchEffect(() => {
  if (state.progress && state.startLevel === -1) {
    state.startLevel = state.progress.level
  }
})

watchEffect(() => {
  if (user.enableSpeechSynthesis) {
    for (const ex of state.exercises) {
      speech.preloadExercise(ex)
    }
  }
})

watch(
  () => state.exercises,
  () => state.exerciseIndex = 0
)

async function nextExercise() {
  // Completed an exercise, gain experience
  const expGained = 200 * props.expMultiplier
  spa.gainPatternExperience(props.pattern.id, expGained)

  if (state.progress.level > state.startLevel) {
    emit("complete")
  } else if (state.exerciseIndex >= state.exercises.length - 1) {
    state.exerciseIndex = 0
  } else {
    state.exerciseIndex += 1
  }
}
</script>


<template>
  <Head>
    <template v-for="ex in state.exercises">
      <link v-if="'image' in ex" rel="preload" as="image" :href="ex.image" />
    </template>
  </Head>
  <div class="practice">
    <div class="exercises">
      <ExerciseView :key="props.pattern.id + '-' + state.exerciseIndex" :exercise="state.exercise" @correct="nextExercise"
        :pattern="props.pattern" />
    </div>
  </div>
</template>

<style>
.practice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem 0;
}
</style>
