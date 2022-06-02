<script lang="ts">
  import { sprachdex } from "./sprachdex"
  import PatternItem from "./PatternItem.svelte"
</script>

<div class="pattern-index">
  <ul>
    {#each sprachdex.publishedPatterns as pattern}
      <PatternItem {pattern} />
    {/each}
  </ul>
  <p><em>More patterns coming soon!</em></p>
</div>

<style>
</style>
