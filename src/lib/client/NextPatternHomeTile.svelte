<script lang="ts">
  import Sprachdown from "$lib/Sprachdown.svelte";
  import sprachy from "$lib/sprachy";

  const { spa } = sprachy.expectSPA();
  const nextPattern = spa.nextPatternToLearn;
</script>

<div class="home-tile">
  {#if nextPattern}
    <a sveltekit:prefetch href={`/pattern/${nextPattern.slug}`}>
      <div class="card">
        <span class="card-title">Next Pattern: {nextPattern.title}</span>
        <p><Sprachdown inline source={nextPattern.shortdesc} /></p>
      </div>
    </a>
  {:else}
    <div class="card">You've learned all available patterns!</div>
  {/if}
</div>

<style lang="sass">
.home-tile
  --tile-color: var(--sprachy-primary)
  color: white
</style>
