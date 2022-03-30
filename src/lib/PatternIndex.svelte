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

<style lang="sass">
.pattern-index
  ul
    display: flex
    flex-wrap: wrap
    padding-left: 0
  
  ul :global(li)
    flex-basis: 33%

@media only screen and (max-width: 1200px)
  .pattern-index ul :global(li)
    flex-basis: 50%

@media only screen and (max-width: 768px)
  .pattern-index ul :global(li)
    flex-basis: 100%
</style>
