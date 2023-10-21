<script lang="ts" setup>
import { chooseFilePrompt } from '~/lib/util'

const config = useRuntimeConfig()

const state = defineState({
  images: [] as any[]
})

onMounted(async () => {
  state.images = (await api.dev.listImages()).slice(0, 10)
  console.log(state.images)
})

async function uploadImage() {
  const file = await chooseFilePrompt()
  if (!file) return
}

</script>

<template>
  <main class="container">
    <button class="btn btn-sprachy">Upload image</button>
    <h1>Uploaded images</h1>
    <ul>
      <li v-for="image in state.images" :key="image">
        <img :src="`${config.public.imagesBaseUrl}/${image.Key}`" />
      </li>
    </ul>
  </main>
</template>

<style scoped>
ul {
  column-count: 3;
  column-gap: 15px;
  padding: 0;
}

li {
  display: inline-block;
  width: 100%;
}

img {
  display: block;
  width: 100%;
}
</style>