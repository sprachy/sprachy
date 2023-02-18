<script setup lang="ts">
import Sprachdown from "~/components/Sprachdown.vue"

defineProps<{
  hint: string
}>()

const state = defineState({
  engaged: false
})

async function engage() {
  state.engaged = !state.engaged
}
</script>

<template>
  <button class="btn btn-light" :class="{ 'engaged': state.engaged, 'disengaged': !state.engaged }"
    @click.prevent="engage">
    <Sprachdown v-if="state.engaged" inline :source="hint" />
    <Sprachdown v-else inline source="Hint" />
  </button>
</template>

<style scoped>
button.disengaged {
  background-color: #d1cee9;
}

button.engaged {
  background-color: #b7d7da;
}
</style>
