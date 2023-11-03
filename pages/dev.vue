<script lang="ts" setup>
import type { Pattern } from '~/lib/Pattern'
import { chooseFilePrompt } from '~/lib/util'

const state = defineState({
  loading: true,
  images: [] as UploadedImageListItem[],
  patterns: [] as Pattern[],
  searchQuery: "",
  dropzone: false,

  get usedImagePaths() {
    const usedImagePaths: Record<string, boolean> = {}

    for (const pattern of this.patterns) {
      for (const exercise of pattern.exercises) {
        for (const line of exercise.lines)
          if (line.image)
            usedImagePaths[line.image] = true
      }

      for (const line of pattern.dialogue.lines) {
        if ('image' in line && line.image)
          usedImagePaths[line.image] = true
      }
    }

    return usedImagePaths
  },

  get unusedImages() {
    return this.images.filter(image => !(image.path in this.usedImagePaths))
  },

  get shownImages() {
    return state.unusedImages.filter(image => image.path.includes(state.searchQuery))
  }
})

onMounted(async () => {
  const [images, patterns] = await Promise.all([
    api.dev.listImages(),
    sprachdex.fetchPatterns({})
  ])
  state.images = images
  state.patterns = patterns
  state.loading = false

  window.addEventListener("dragover", onDragOver)
  window.addEventListener("dragenter", onDragEnter)
  window.addEventListener("dragleave", onDragLeave)
  window.addEventListener("drop", onDrop)
})

onUnmounted(() => {
  window.removeEventListener("dragover", onDragOver)
  window.removeEventListener("dragenter", onDragEnter)
  window.removeEventListener("dragleave", onDragLeave)
  window.removeEventListener("drop", onDrop)
})

async function uploadImage(file: File) {
  state.loading = true
  try {
    const img = await api.dev.uploadImage(file)
    state.images.unshift(img)
  } finally {
    state.loading = false
  }
}

async function chooseFileToUpload() {
  const file = await chooseFilePrompt()
  if (!file) return

  uploadImage(file)
}

function onImageDeleted(path: string) {
  state.images = state.images.filter(image => image.path !== path)
}

function onDragOver(ev: DragEvent) {
  ev.preventDefault()
}

function onDragEnter() {
  state.dropzone = true
}

function onDragLeave() {
  state.dropzone = false
}

async function onDrop(ev: DragEvent) {
  ev.preventDefault()
  state.dropzone = false
  if (!ev.dataTransfer) return

  const fileItems = Array.from(ev.dataTransfer.items).filter(item => item.kind === "file")

  await Promise.all(fileItems.map(item => uploadImage(item.getAsFile()!)))
}
</script>

<template>
  <main :class="{ container: true, dropzone: state.dropzone }">
    <div class="d-flex justify-content-between">
      <h1>Sprachy dev panel</h1>
      <Message from="squirrel">
        Lasst uns gemeinsam süße Übungen machen!
      </Message>
    </div>
    <button class="btn btn-sprachy" @click="chooseFileToUpload">Upload image</button>
    <h2 class="mt-4">Uploaded images</h2>
    <p>These are all the images that haven't been used in an exercise yet. Click an image to copy the path for use in an
      exercise.</p>
    <input class="form-control" type="search" placeholder="Search filenames..." v-model="state.searchQuery" />
    <div class="loading" v-if="state.loading">
      <LoadingIndicator />
    </div>
    <ul class="mt-3" v-else-if="state.shownImages.length">
      <DevImageItem v-for="image in state.shownImages" :key="image.path" :image="image"
        @delete="onImageDeleted(image.path)" />
    </ul>
    <div class="mt-3" v-else>
      No results!
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100%;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

ul {
  column-count: 3;
  column-gap: 15px;
  padding: 0;
}

.dropzone {
  background-color: #f8f9fa;
  border: 2px dashed #ced4da;
}
</style>