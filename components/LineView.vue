<script setup lang="ts">
import type { Line } from "~/lib/Line"
import Sprachdown from "~/components/Sprachdown.vue"
import Message from "~/components/Message.vue"
import AudioForLine from "~/components/AudioForLine.vue"
import Choices from "~/components/Choices.vue"

const props = defineProps<{
  line: Line,
  flip: boolean,
  current: boolean
}>()

const emit = defineEmits<{
  (e: "correct"): void
}>()

const state = defineState({
  choiceAudioReady: false,
  showHint: false,
  correct: false
})

watch(
  () => props.line,
  () => {
    state.choiceAudioReady = false
    state.showHint = false
    state.correct = false
  }
)

function onCorrect() {
  state.correct = true
  emit('correct')
}
</script>

<template>
  <div :class="{ LineView: true, 'align-items-center': !!line.choices }">
    <figure v-if="line.image">
      <img :src="getUploadedImageUrl(line.image)" :alt="line.imageAlt" />
    </figure>
    <Message v-if="line.message" :flip="flip" :from="line.from" :tooltip="line.translation">
      <AudioForLine :opts="line" playImmediately @finished="state.choiceAudioReady = true" />
      <div>
        <template v-for="part in line.parts">
          <Sprachdown v-if="part.type === 'text'" inline :source="part.text" />
          <Blank v-if="part.type === 'blank'" :source="part.answer" :filled="state.correct" />
        </template>
      </div>
    </Message>
    <!-- <div v-else-if="line.message"
      class="hover-translate question text-center mt-2 mb-2"
      :data-tooltip="line.translation">
      <AudioForLine :opts="{ from: 'narrator', message: line.message }" playImmediately />
      <span class="me-1" />
      <Sprachdown inline :source="line.message" />
    </div> -->
    <Choices v-if="line.choices" :choices="line.choices" :hint="line.hint" @correct="onCorrect"
      @incorrect="state.showHint = true" :muted="!state.choiceAudioReady" :complete="!props.current"
      :responder="line.responder" />
    <Sprachdown class="hint" v-if="state.showHint && line.hint" :source="'Hint: ' + line.hint" />
  </div>
</template>

<style scoped>
.LineView {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.question {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

figure {
  display: flex;
  justify-content: center;
  margin: 0;
}

img {
  max-height: 50vh;
}

.hint {
  margin-top: 1rem;
}
</style>
