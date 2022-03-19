<script lang="ts">
  import Timeago from "$lib/client/Timeago.svelte"
  import sprachy from "$lib/sprachy"
  const { spa } = sprachy.expectSPA()

  $: numLevelable = spa.patternsReadyToLevel.length
  $: nextLevelable = spa.nextLevelablePattern
</script>

{#if spa.learnedPatterns.length > 0}
  <div class="home-tile">
    <a sveltekit:prefetch href="/practice">
      {#if numLevelable === 0 && nextLevelable && nextLevelable.progress.levelableAt}
        <div class="card">
          <span class="card-title">Free Practice</span>
          <p>
            You can level a pattern in <Timeago
              ts={nextLevelable.progress.levelableAt}
            />
          </p>
        </div>
      {:else}
        <div class="card">
          <span class="card-title">Level Practice</span>
          <p>
            You can level up {numLevelable} pattern{numLevelable > 1 ? "s" : ""}
          </p>
        </div>
      {/if}
    </a>
  </div>
{/if}

<style lang="sass">
.home-tile
  --tile-color: var(--sprachy-secondary)
  color: white
</style>
