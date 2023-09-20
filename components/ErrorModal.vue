
<script setup lang="ts">
defineProps<{
  error: Error
}>()

const emit = defineEmits<{
  (e: "hidden"): void
}>()
</script>

<template>
  <Modal id="unexpectedErrorModal" size="lg" @hidden="emit('hidden')">
    <template #header>
      <div>
        <h5>{{ error.message }}</h5>
      </div>
    </template>

    <p>Sprachy encountered an unexpected error. Please screenshot this message and report it to the development
      team.</p>
    <pre>{{ error.stack }}</pre>

    <template #footer>
      <button class="btn" variant="primary" @click="$emit('hidden')">
        Continue
      </button>
    </template>
  </Modal>
</template>


<style scoped>
.modal {
  z-index: 10000;
}

h5,
.modal-header pre {
  color: red;
}

pre {
  white-space: pre-wrap;
  font-size: 80%;
}

iframe {
  width: 100%;
  height: 600px;
}
</style>
