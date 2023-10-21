<script lang="ts" setup>
import { chooseFilePrompt } from '~/lib/util'

const config = useRuntimeConfig()

const state = defineState({
  loading: true,
  images: [] as any[],
  searchQuery: "",

  get shownImages() {
    return state.images.filter(image => image.path.includes(state.searchQuery))
  }
})

onMounted(async () => {
  state.images = await api.dev.listImages()
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
    <p>These images are stored in the R2 bucket at <code>{{ config.public.imagesBaseUrl }}</code>.</p>
    <input class="form-control" type="search" placeholder="Search filenames..." v-model="state.searchQuery" />
    <div class="loading" v-if="state.loading">
      <LoadingIndicator />
    </div>
    <ul class="mt-3" v-else>
      <DevImageItem v-for="image in state.shownImages" :key="image.path" :image="image"
        @delete="onImageDeleted(image.path)" />
    </ul>
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