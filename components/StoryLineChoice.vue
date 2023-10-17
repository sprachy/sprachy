<script setup lang="ts">
import type { DialogueLineChoice } from "~/lib/Dialogue"
import Sprachdown from "~/components/Sprachdown.vue"
import Choices from "~/components/Choices.vue"
import AudioForLine from "~/components/AudioForLine.vue"

defineProps<{
  line: DialogueLineChoice
  complete: boolean
}>()

const emit = defineEmits<{
  (event: "correct"): void
}>()
</script>

<template>
  <div>
    <div class="question d-flex align-items-center mb-2">
      <AudioForLine :opts="{ from: 'narrator', message: line.question }" />
      <span class="me-1" />
      <Sprachdown inline :source="line.question" />
    </div>
    <Choices :choices="line.choices" @correct="emit('correct')" :complete="complete" />
  </div>
</template>
