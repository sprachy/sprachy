<script setup lang="ts">
import type { MultipleChoiceExercise } from "~/lib/Exercise"
import Sprachdown from "~/components/Sprachdown.vue"
import Message from "~/components/Message.vue"
import AudioForLine from "~/components/AudioForLine.vue"
import Choices from "~/components/Choices.vue"

defineProps<{
  exercise: MultipleChoiceExercise
}>()

const emit = defineEmits<{
  (e: "correct"): void
}>()
</script>

<template>
  <div class="exercise">
    <img v-if="exercise.image" :src="exercise.image" alt="Identify this" />
    <div v-if="exercise.from && exercise.message" class="message">
      <Message :from="exercise.from" :tooltip="exercise.translation">
        <AudioForLine :opts="exercise" playImmediately />
        <Sprachdown inline :source="exercise.message" />
      </Message>
    </div>
    <div v-if="exercise.question" class="hover-translate question text-center mt-2 mb-2"
      :data-tooltip="exercise.questionTranslation">
      <AudioForLine :opts="{ from: 'narrator', message: exercise.question }" playImmediately />
      <span class="me-1" />
      <Sprachdown inline :source="exercise.question" />
    </div>
    <Choices :choices="exercise.choices" :hint="exercise.hint" @correct="emit('correct')" />
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
