<script setup lang="ts">
import {
  faVolumeHigh,
  faVolumeLow,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const props = withDefaults(defineProps<{
  playing?: boolean
  loading?: boolean
}>(), {
  playing: false,
  loading: false
})

const state = useLocalReactive({
  icon: faVolumeHigh,
  interval: null as ReturnType<typeof setInterval> | null
})


watchEffect(() => {
  if (props.playing && !state.interval) {
    state.interval = setInterval(() => {
      state.icon = state.icon === faVolumeHigh ? faVolumeLow : faVolumeHigh
    }, 200)
  } else if (!props.playing && state.interval) {
    state.icon = faVolumeHigh
    clearInterval(state.interval)
    state.interval = null
  }
})
</script>

<template>
  <div class="SoundIndicator" @click.prevent>
    <FontAwesomeIcon v-if="loading" :icon="faSpinner" spin pull="left" size="sm" />
    <FontAwesomeIcon v-else :icon="state.icon" pull="left" size="sm" />
  </div>
</template>

<style scoped>
.SoundIndicator {
  display: inline-block;
  width: 21px;
  margin-right: 0.2rem;
}

.SoundIndicator :global(svg) {
  cursor: pointer;
  color: #666;
}
</style>
