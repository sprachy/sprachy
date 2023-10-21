<script lang="ts" setup>
import type { Pattern } from '~/lib/Pattern'
import { chooseFilePrompt } from '~/lib/util'

const state = defineState({
  loading: true,
  images: [] as UploadedImageListItem[],
  patterns: [] as Pattern[],
  searchQuery: "",

  get usedImagePaths() {
    const usedImagePaths: Record<string, boolean> = {}

    for (const pattern of this.patterns) {
      for (const exercise of pattern.exercises) {
        if (exercise.image)
          usedImagePaths[exercise.image] = true
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
    return state.images.filter(image => image.path.includes(state.searchQuery))
  }
})

onMounted(async () => {
  const [images, patterns] = await Promise.all([
    api.dev.listImages(),
    sprachdex.fetchPatterns({})
  ])
  state.images = images
  console.log(patterns)
  state.loading = false
})

async function uploadImage() {
  const file = await chooseFilePrompt()
  if (!file) return

  const img = await api.dev.uploadImage(file)
  state.images.unshift(img)
}

function onImageDeleted(path: string) {
  state.images = state.images.filter(image => image.path !== path)
}

</script>

<template>
  <main class="container">
    <div class="d-flex justify-content-between">
      <h1>Sprachy dev panel</h1>
      <Message from="squirrel">
        Lasst uns gemeinsam süße Übungen machen!
      </Message>
    </div>
    <button class="btn btn-sprachy" @click="uploadImage">Upload image</button>
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
</style>