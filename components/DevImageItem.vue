<script lang="ts" setup>
const config = useRuntimeConfig()

const props = defineProps<{
  image: UploadedImageListItem
}>()

const emit = defineEmits<{
  (e: "delete"): () => void
}>()

const state = defineState({
  copied: false
})

let timeout: number | null = null
async function copyPathToClipboard() {
  try {
    await navigator.clipboard.writeText(props.image.path)
  } catch (err) {
    // "document is not focused" and other silly things
    return
  }
  state.copied = true
  if (timeout)
    clearTimeout(timeout)
  // @ts-ignore
  timeout = setTimeout(() => state.copied = false, 1000)
}

async function deleteImage() {
  if (!confirm(`Are you sure you want to delete ${props.image.path}?`)) return
  await api.dev.deleteImage(props.image.path)
  emit("delete")
}
</script>

<template>
  <li @click="copyPathToClipboard" @dblclick="deleteImage">
    <img :src="`${config.public.imagesBaseUrl}/${image.path}`" />
    <div class="pathOverlay">
      {{ state.copied ? "Copied!" : image.path }}
    </div>
  </li>
</template>

<style scoped>
li {
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: pointer;
}

img {
  display: block;
  width: 100%;
}

.deleteButton {
  position: absolute;
  display: none;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
}

.pathOverlay {
  position: absolute;
  display: none;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 10px;
  padding: 0.2rem;
}

li:hover .pathOverlay,
li:hover .deleteButton {
  display: flex;
}
</style>