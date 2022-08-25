<script lang="ts">
  import _ from "lodash"

  import type { Pattern } from "$lib/Pattern"
  import Story from "$lib/Story.svelte"
  import { page } from "$app/stores"

  $: pattern = ($page.stuff as any).pattern as Pattern
</script>

<article class="dialogue">
  <Story staticMode story={pattern.story} />
</article>

<style>
</style>
