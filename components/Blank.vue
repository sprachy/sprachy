<script lang="ts" setup>
withDefaults(defineProps<{
  source: string
  filled: boolean
}>(), {
  filled: false
})

</script>

<template>
  <span class="Blank">
    <span :style="{ opacity: filled ? 1 : 0 }">
      {{ source }}
    </span>
  </span>
</template>

<style scoped>
span.Blank {
  color: #64b5f6;
  border: 0;
  border-bottom: 2px solid #dcddde;
  display: inline-flex;
  text-align: center;
  line-height: 1.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>