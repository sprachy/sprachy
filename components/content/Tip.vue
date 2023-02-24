<script setup lang="ts">
import Sprachdown from "../Sprachdown.vue"

const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: "Tip"
})
</script>

<template>
  <div class="tip alert alert-info">
    <strong>{{ title }}: </strong>
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>

<style scoped>
.tip {
  background-color: transparent;
  border: 2px solid #64b5f6;
  color: #333;
}

.tip :global(strong) {
  color: #64b5f6 !important;
}

.tip :global(p):last-child {
  margin-bottom: 0;
}
</style>
