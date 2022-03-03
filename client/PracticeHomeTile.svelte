<script lang="ts">
  import { Link } from "svelte-navigator"
  import sprachy from "./sprachy"
  import Timeago from "./Timeago.svelte"

  $: numLevelable = sprachy.app.patternsReadyToLevel.length
  $: nextLevelable = sprachy.app.nextLevelablePattern
</script>

<div class="home-tile">
  <Link to={`/practice`}>
    {#if numLevelable === 0 && nextLevelable && nextLevelable.progress.levelableAt}
      <div class="card">
        <span class="card-title">Free Practice</span>
        <p>You can level a pattern in <Timeago ts={nextLevelable.progress.levelableAt} /></p>
      </div>
    {:else}
      <div class="card">
        <span class="card-title">Level Practice</span>
        <p>You can level up {numLevelable} pattern{numLevelable > 1 ? "s" : ""}</p>
      </div>
    {/if}
  </Link>
</div>

<style lang="sass">
.home-tile
  font-size: 1.1rem
  flex-grow: 1
  margin-left: 0.5rem

  :global(a)
    text-decoration: none
    color: inherit

  .card
    padding: 1rem

  .card:hover .card-title
    text-decoration: underline

  .card-title
    color: #64b5f6
    font-weight: bold
    margin-bottom: 0.5rem

  p
    margin: 0
</style>
