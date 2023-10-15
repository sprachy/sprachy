<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  content: string
}>(), {
  title: "Tip"
})
</script>

<template>
  <div class="tip alert alert-info">
    <strong>{{ props.title }}: </strong>
    <Sprachdown v-if="props.content" :source="props.content" />
    <slot />
  </div>
</template>

<style scoped>
.tip {
  background-color: transparent;
  border: 2px solid #64b5f6;
  color: #333;
}

.tip :deep(strong) {
  color: #64b5f6 !important;
}

.tip :deep(p):last-child {
  margin-bottom: 0;
}
</style>
