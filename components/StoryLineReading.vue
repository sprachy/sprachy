<script setup lang="ts">
import type { ReadingLine } from "~/lib/Pattern"
import Message from "~/components/Message.vue"
import Sprachdown from "~/components/Sprachdown.vue"
import AudioForLine from "~/components/AudioForLine.vue"

defineProps<{
  line: ReadingLine
  flip?: boolean
  staticMode?: boolean
}>()
</script>

<template>
  <div class="reading">
    <Message v-if="line.message" :from="line.from" :flip="flip" :tooltip="line.translation">
      <div>
        <AudioForLine :opts="line" :playImmediately="!staticMode" />
        <Sprachdown inline :source="line.message" />
      </div>
    </Message>
    <img v-if="line.image" :alt="line.imageAlt" :src="line.image" />
  </div>
</template>

<style scoped>
img {
  max-height: 300px;
  margin-top: 1rem;
}
</style>
