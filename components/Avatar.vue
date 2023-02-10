<script setup lang="ts">
import { sprachdex } from "~/lib/sprachdex"
import Sprachdown from "~/components/Sprachdown.vue"

const props = defineProps<{
  charId: string
}>()

const state = useLocalReactive({
  showProfile: false,

  get character() {
    return sprachdex.getCharacter(props.charId)
  }
})

const avatarEl = ref<HTMLElement>()

function onClickElsewhere(ev: MouseEvent) {
  // Hide profile popover if you click outside it
  if (ev.target instanceof Element && !avatarEl.value?.contains(ev.target)) {
    state.showProfile = false
  }
}

function toggleProfile() {
  state.showProfile = !state.showProfile
}

onMounted(() => {
  window.addEventListener("click", onClickElsewhere)
})

onUnmounted(() => {
  window.removeEventListener("click", onClickElsewhere)
})
</script>

<template>
  <div class="avatar" ref="avatarEl">
    <img :src="state.character.avatar" :alt="state.character.fullname" @click.prevent="toggleProfile" />
    <div v-if="state.showProfile && state.character.profile" class="profile shadow">
      <div class="card">
        <div class="card-header">
          <img :src="state.character.avatar" :alt="state.character.fullname" />
          {{ state.character.fullname }}
        </div>
        <div class="card-body">
          <Sprachdown :source="state.character.profile" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
}

.avatar img {
  cursor: pointer;
}

.profile {
  z-index: 1006;
  position: absolute;
  left: 80%;
  top: -8px;
  width: 350px;
}

.profile img {
  width: 50px;
  height: 50px;
}
</style>
