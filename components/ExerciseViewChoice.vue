<script setup lang="ts">
import type { ExerciseMultipleChoice } from "~/lib/Exercise"
import Sprachdown from "~/components/Sprachdown.vue"
import Message from "~/components/Message.vue"
import AudioForLine from "~/components/AudioForLine.vue"
import Choices from "~/components/Choices.vue"

const props = defineProps<{
  exercise: ExerciseMultipleChoice
}>()

const emit = defineEmits<{
  (e: "correct"): void
}>()

const state = defineState({
  choiceAudioReady: false
})

watch(
  () => props.exercise,
  () => {
    state.choiceAudioReady = false
  }
)
</script>

<template>
  <div class="exercise">
    <img v-if="exercise.image" :src="imageLibrary[exercise.image]" alt="Identify this" />
    <div v-if="exercise.from && exercise.message" class="message">
      <Message :from="exercise.from" :tooltip="exercise.translation">
        <AudioForLine :opts="exercise" playImmediately @finished="state.choiceAudioReady = true" />
        <Sprachdown inline :source="exercise.message" />
      </Message>
    </div>
    <div v-else-if="exercise.message"
      class="hover-translate question text-center mt-2 mb-2"
      :data-tooltip="exercise.translation">
      <AudioForLine :opts="{ from: 'narrator', message: exercise.message }" playImmediately />
      <span class="me-1" />
      <Sprachdown inline :source="exercise.message" />
    </div>
    <Choices :choices="exercise.choices" :hint="exercise.hint" @correct="emit('correct')"
      :muted="!state.choiceAudioReady" />
  </div>
</template>

<style scoped>
.exercise {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.question {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

img {
  max-height: 50vh;
}
</style>
