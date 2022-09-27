<script lang="ts">
  import _ from "lodash"
  import Story from "$lib/Story.svelte"
  import type { PageData } from "./$types"

  export let data: PageData
  const { pattern } = data
</script>

<article class="dialogue">
  <Story staticMode story={pattern.story} />
</article>

<style>
</style>
