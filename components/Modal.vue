
<script setup lang="ts">
const props = defineProps<{
  title?: string
  size?: 'sm' | 'lg' | 'xl'
}>()

const emit = defineEmits<{
  (e: "hidden"): void
}>()

const modalRef = ref<HTMLElement | null>(null)

const state = defineState({
  get sizeClass() {
    if (props.size) {
      return `modal-${props.size}`
    }
  }
})

function maybeClickOutside(ev: MouseEvent) {
  if (modalRef.value && !modalRef.value.querySelector(".modal-content")?.contains(ev.target as Node)) {
    emit('hidden')
  }
}

onMounted(() => {
  setTimeout(() => window.addEventListener('click', maybeClickOutside), 100)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', maybeClickOutside)
})
</script>

<template>
  <div class="sprachy-modal" ref="modalRef">
    <div class="modal show" tabindex="-1">
      <div :class="['modal-dialog', state.sizeClass]">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header" />
            <h5 v-if="title" class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('hidden')" />
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" />
  </div>
</template>

<style scoped>
.modal {
  display: block !important;
  text-align: left;
}
</style>
