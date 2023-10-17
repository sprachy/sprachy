<script lang="ts" setup>
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
</script>

<template>
  <button class="btn MuteToggle" @click="speech.toggleMute">
    <div>
      <FontAwesomeIcon pull="left" :icon="speech.enabled ? faVolumeHigh : faVolumeMute" />
    </div>
  </button>
</template>

<style>
.MuteToggle {
  width: 47px;
  color: #666;
}
</style>
