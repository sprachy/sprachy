<script lang="ts">
  import Sprachdown from "$lib/Sprachdown.svelte"
  import type { Pattern } from "$lib/Pattern"
  import sprachy from "$lib/sprachy"

  export let pattern: Pattern

  const patternAndProgressById = sprachy.spa?.patternAndProgressById
  const progress = $patternAndProgressById
    ? $patternAndProgressById[pattern.id]?.progress
    : null

  $: level = progress ? progress.level : 0
</script>

<li class:pattern={true}>
  <a href="/{pattern.slug}" sveltekit:prefetch>
    <div class="pattern-inner">
      <div class="level-part">
        <div class="levelbar">
          {#each { length: 5 } as _, i}
            <div class:pip={true} class:filled={level >= i + 1} />
          {/each}
        </div>
        Lv. {level}
      </div>
      <div class="text-part">
        <h6>
          {pattern.title}
        </h6>
        <div class="shortdesc">
          <Sprachdown inline source={pattern.shortdesc} />
        </div>
        <!-- <div class="submenu">
        <div class="step">
          <a href={`/story/${pattern.slug}`} sveltekit:prefetch>
            <Fa icon={faBook} />
          </a>
        </div>
        <div class="step">
          <a href={`/practice/${pattern.slug}`} sveltekit:prefetch>
            <Fa icon={faTrain} />
          </a>
        </div>
        <div class="step">
          <Fa icon={faCrown} />
        </div>
      </div> -->
      </div>
    </div>
  </a>
</li>

<style>
  .pattern {
    --pattern-color: var(--sprachy-primary);
  }

  .pattern {
    display: flex;
    list-style-type: none;
    border-radius: 3px;
    padding: 0.5rem;
  }

  .pattern > a {
    display: block;
    background: #f5f5f6;
  }

  .pattern h6 {
    color: var(--pattern-color);
  }

  .pattern > :global(a) {
    display: flex;
    align-items: center;
    padding: 1.5rem 1rem;
    color: inherit;
    text-decoration: none;
    flex-grow: 1;
  }

  .pattern > :global(a):hover :global(h6) {
    text-decoration: underline;
  }

  .pattern h6 {
    font-size: 1.15rem;
    margin-bottom: 0.2rem;
  }

  .pattern .shortdesc {
    margin-bottom: 0.1rem;
  }

  .pattern-inner {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .text-part {
    flex-grow: 1;
  }

  .level-part {
    margin: 0 1rem;
    height: 100px;
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    align-items: center;
    min-width: 35px;
    color: var(--pattern-color);
  }

  .levelbar {
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    gap: 1px;
    width: 20px;
  }

  .levelbar .pip {
    flex-grow: 1;
    width: 100%;
    background: #e9ecef;
  }

  .levelbar .pip.filled {
    background: var(--pattern-color);
  }
</style>
