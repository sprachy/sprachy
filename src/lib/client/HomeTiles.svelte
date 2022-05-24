<script lang="ts">
  import Timeago from "$lib/client/Timeago.svelte"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import sprachy from "$lib/sprachy"
  import Fa from "svelte-fa"
  import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

  const {
    learnedPatterns,
    nextPatternToLearn,
    patternsReadyToLevel,
    nextLevelablePattern,
  } = sprachy.expectSPA()

  $: nextPattern = $nextPatternToLearn
  $: numLevelable = $patternsReadyToLevel.length
  $: nextLevelable = $nextLevelablePattern
</script>

<div class="tiles">
  <div class="home-tile next-pattern">
    {#if nextPattern}
      <a sveltekit:prefetch href={`/pattern/${nextPattern.slug}`}>
        <div class="card">
          <span class="card-title">Next Pattern: {nextPattern.title}</span>
          <p><Sprachdown inline source={nextPattern.shortdesc} /></p>
          <Fa icon={faChevronRight} />
        </div>
      </a>
    {:else}
      <div class="card">You've learned all available patterns!</div>
    {/if}
  </div>

  {#if $learnedPatterns.length > 0}
    <div class="home-tile practice">
      <a sveltekit:prefetch href="/practice">
        <div class="card">
          {#if numLevelable === 0 && nextLevelable && nextLevelable.progress.levelableAt}
            <span class="card-title">Practice</span>
            <p>
              You can level a pattern <Timeago
                ts={nextLevelable.progress.levelableAt}
              />
            </p>
          {:else}
            <span class="card-title">Level Practice</span>
            <p>
              You can level up {numLevelable} pattern{numLevelable > 1
                ? "s"
                : ""}
            </p>
          {/if}
          <Fa icon={faChevronRight} />
        </div>
      </a>
    </div>
  {/if}
</div>

<style>
  .tiles {
    display: flex;
  }

  .home-tile.next-pattern {
    --tile-color: var(--sprachy-primary);
  }

  .home-tile.practice {
    --tile-color: var(--sprachy-secondary);
  }

  .home-tile {
    font-size: 1.1rem;
    flex-basis: 50%;
    color: white;
    position: relative;
  }

  .home-tile .card {
    border: none;
    background-color: var(--tile-color);
    color: inherit;
    padding: 1.2rem 1rem;
  }

  .home-tile a {
    color: inherit;
    text-decoration: none;
  }

  .home-tile a:hover .card {
    background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0 0);
  }

  .home-tile .card-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .home-tile p {
    margin: 0;
  }

  .home-tile :global(svg) {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .home-tile:first-child {
    margin-right: 0.5rem;
  }

  .home-tile:nth-child(2) {
    margin-left: 0.5rem;
  }
</style>
