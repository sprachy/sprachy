<script lang="ts">
  import Fa from "svelte-fa"

  import Sprachdown from "$lib/Sprachdown.svelte"
  // import Timeago from "$lib/client/Timeago.svelte"
  import type { Pattern } from "$lib/Pattern"

  export let pattern: Pattern
  $: patternLearned = false //pattern.progress.srsLevel > 0
  $: patternMastered = false //pattern.progress.srsLevel === pattern.maxLevel
</script>

<li
  class:pattern={true}
  class:learned={patternLearned}
  class:mastered={patternMastered}
>
  <a href="/pattern/{pattern.slug}" sveltekit:prefetch>
    <div class="icon">
      <Fa icon={pattern.icon} />
    </div>
    <div>
      <h6>
        {pattern.title}
        <!-- {#each { length: pattern.progress.srsLevel } as _}
          <span>⭐</span>
        {/each} -->
      </h6>
      <div class="shortdesc">
        <Sprachdown inline source={pattern.shortdesc} />
      </div>
    </div>
  </a>
</li>

<style>
  li.pattern {
    --pattern-color: var(--sprachy-primary);
  }

  li.pattern.learned {
    --pattern-color: var(--sprachy-gradthree);
  }

  li.pattern.mastered {
    --pattern-color: var(--sprachy-secondary);
  }

  li.pattern {
    display: flex;
    list-style-type: none;
  }

  li.pattern div.icon {
    background-color: var(--pattern-color);
  }
  li.pattern h6 {
    color: var(--pattern-color);
  }

  li.pattern > :global(a) {
    display: flex;
    align-items: center;
    padding: 1.5rem 1rem;
    padding-left: 0;
    color: inherit;
    text-decoration: none;
    flex-grow: 1;
  }

  li.pattern > :global(a):hover :global(h6) {
    text-decoration: underline;
  }

  li.pattern .icon {
    padding: 0.75rem;
    margin-right: 1rem;
    border-radius: 0.25rem;
  }

  li.pattern .icon :global(svg) {
    color: white;
    width: 32px;
    height: 32px !important;
    vertical-align: middle !important;
  }

  li.pattern h6 {
    font-size: 1.1rem;
    margin-bottom: 0.1rem;
  }

  li.pattern .shortdesc {
    margin-bottom: 0.1rem;
  }
</style>
