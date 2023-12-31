<script lang="ts" setup>
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const state = defineState({
  open: false
})

watch(
  () => speech.volume,
  () => {
    if (speech.currentlySaying) {
      speech.currentlySaying.el.volume = speech.volume
    }
    speech.saveVolume()
  }
)

onMounted(() => {
  speech.loadVolume()
})
</script>

<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <FontAwesomeIcon pull="left" :icon="speech.enabled ? faVolumeHigh : faVolumeMute" />
    </a>
    <div class="dropdown-menu dropdown-menu-end">
      <div class="expanded-control">
        <div class="indicator">
          <FontAwesomeIcon :icon="speech.enabled ? faVolumeHigh : faVolumeMute" />
        </div>
        <input type="range" min="0" max="1" step="0.01" v-model="speech.volume" />
      </div>
    </div>
  </li>
</template>

<style scoped>
a.nav-link svg {
  color: #666;
  height: 25px;
  width: 20px;
}

a.dropdown-toggle::after {
  display: none;
}

.expanded-control {
  padding: 1rem;
  display: flex;
  align-items: center;
  user-select: none;
}

.indicator {
  margin: 0.2rem;
  margin-right: 0.8rem;
  color: #666;
}

input {
  cursor: pointer;
}
</style>
