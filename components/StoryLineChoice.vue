<script setup lang="ts">
import type { MultipleChoiceLine } from "~/lib/Pattern"
import Sprachdown from "~/components/Sprachdown.vue"
import Choices from "~/components/Choices.vue"
import AudioForLine from "~/components/AudioForLine.vue"

defineProps<{
  line: MultipleChoiceLine
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

<style>

</style>
