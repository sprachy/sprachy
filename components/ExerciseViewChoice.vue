<script setup lang="ts">
import type { MultipleChoiceExercise } from "~/lib/Exercise"
import Sprachdown from "~/components/Sprachdown.vue"
import Message from "~/components/Message.vue"
import AudioForLine from "~/components/AudioForLine.vue"
import Choices from "~/components/Choices.vue"

const props = defineProps<{
  exercise: MultipleChoiceExercise
}>()

const emit = defineEmits<{
  (e: "correct"): void
}>()

const state = defineState({
  choiceAudioReady: false,
  mode: 'start' as 'start' | 'hint' | 'done'
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && state.mode === 'done') {
    emit('correct')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})

watch(
  () => props.exercise,
  () => {
    state.mode = 'start'
    state.choiceAudioReady = false
  }
)
</script>

<template>
  <div class="exercise">
    <img v-if="exercise.image" :src="getUploadedImageUrl(exercise.image)" alt="Identify this" />
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
    <Choices :choices="exercise.choices" :hint="exercise.hint" @correct="state.mode = 'done'"
      @incorrect="state.mode = 'hint'" :muted="!state.choiceAudioReady" :complete="state.mode === 'done'" />
    <Sprachdown class="hint" v-if="state.mode === 'hint' && exercise.hint" :source="'Hint: ' + exercise.hint" />

    <template v-if="state.mode === 'done'">
      <div class="text-center mt-4">
        <Sprachdown class="correct" v-if="exercise.correct" :source="exercise.correct" />
        <button class="btn btn-outline-success" @click="emit('correct')">Continue</button>
        <!-- <Keyhint class="mt-1">Enter</Keyhint> -->
      </div>
    </template>
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

.hint {
  margin-top: 1rem;
}
</style>
