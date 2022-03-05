<script lang="ts">
  import { Link } from "svelte-navigator"
  import Sprachdown from "./Sprachdown.svelte"
  import sprachy from "./sprachy"

  const nextPattern = sprachy.app.nextPatternToLearn
</script>

<div class="home-tile">
  {#if nextPattern}
    <Link to={`/pattern/${nextPattern.slug}`}>
      <div class="card">
        <span class="card-title">Next Pattern: {nextPattern.title}</span>
        <p><Sprachdown inline source={nextPattern.shortdesc} /></p>
      </div>
    </Link>
  {:else}
    <div class="card">You've learned all available patterns!</div>
  {/if}
</div>

<style lang="sass">
.home-tile
  --tile-color: var(--sprachy-primary)
  color: white
</style>
