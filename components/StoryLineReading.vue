<script setup lang="ts">
import type { DialogueLineReading } from "~/lib/Dialogue"
import Message from "~/components/Message.vue"
import Sprachdown from "~/components/Sprachdown.vue"
import AudioForLine from "~/components/AudioForLine.vue"

defineProps<{
  line: DialogueLineReading
  flip?: boolean
  staticMode?: boolean
}>()
</script>

<template>
  <div class="reading">
    <Message v-if="line.message" :from="line.from" :flip="flip" :tooltip="line.translation">
      <AudioForLine :opts="line" :playImmediately="!staticMode" />
      <Sprachdown inline :source="line.message" />
    </Message>
    <img v-if="line.image" :alt="line.imageAlt" :src="getUploadedImageUrl(line.image)" />
  </div>
</template>

<style scoped>
img {
  max-height: 300px;
  margin-top: 1rem;
}
</style>
