<script lang="ts">
  import type { Pattern } from "./Pattern"
  import Sprachdown from "./Sprachdown.svelte"
  export let pattern: Pattern
</script>

<article class="explanation">
  <Sprachdown source={pattern.explanation} />
</article>

<style>
  .explanation {
    font-size: 17px;
    line-height: 28px;
  }

  .explanation :global(strong) {
    color: rgb(28, 176, 246);
  }

  .explanation :global(.btn) {
    margin-right: 0.5rem;
  }

  @media only screen and (max-width: 768px) {
    .explanation :global(table) {
      font-size: 90%;
    }
  }
</style>
