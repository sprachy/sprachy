<script lang="ts">
  import { Link } from "svelte-navigator"
  import sprachy from "./sprachy"

  const nextPattern = sprachy.app.nextPatternToLearn
</script>

<div class="home-tile">
  {#if nextPattern}
    <Link to={`/pattern/${nextPattern.slug}`}>
      <div class="card">
        <span class="card-title">Next Pattern: {nextPattern.title}</span>
        <p>{nextPattern.shortdesc}</p>
      </div>
    </Link>
  {:else}
    <div class="card">You've learned all available patterns!</div>
  {/if}
</div>

<style lang="sass">
.home-tile
  font-size: 1.1rem
  flex-grow: 1
  margin-right: 0.5rem

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
