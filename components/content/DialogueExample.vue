<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const blocks = props.content.split(/(?=^\w+:)/gm).filter((b) => b.trim().length)

const messages = blocks.map((b) => {
  const lines = b.split("\n")
  return {
    from: lines[0]!.trim().split(":")[0]!,
    original: lines[1]!.trim(),
    translation: lines[2]!.trim(),
  }
})
</script>

<template>
  <div class="dialogue">
    <Message v-for="message in messages" :from="message.from">
      <Sprachdown inline :source="message.original" />
      <div class="translation" slot="after">
        <Sprachdown inline :source="message.translation" />
      </div>
    </Message>
  </div>
</template>

<style scoped>
.dialogue {
  margin-bottom: 1rem;
}

.dialogue :global(.message):not(:first-child) {
  margin-top: 10px;
}

.translation {
  font-size: 90%;
  color: #444;
}
</style>
