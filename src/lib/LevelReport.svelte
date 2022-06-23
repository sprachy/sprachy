<script lang="ts">
  import type { Pattern } from "./Pattern"
  import type { PatternProgress } from "./client/SprachyUserSPA"
  import LevelReportItem from "./LevelReportItem.svelte"
  import { createEventDispatcher } from "svelte"

  export let gains: {
    pattern: Pattern
    progress: PatternProgress
    experience: number
  }[]

  const dispatch = createEventDispatcher()

  let items = gains.map((g) => ({
    title: g.pattern.title,
    expStart: g.progress.experience - g.experience,
    expGained: g.experience,
  }))

  let itemRefs: LevelReportItem[] = []

  // let key = "waffles"
  function testProgress() {
    for (const ref of itemRefs) {
      ref.testProgress()
    }
  }
</script>

<div>
  <table>
    {#each items as item, i}
      <LevelReportItem
        {...item}
        bind:this={itemRefs[i]}
        on:animEnd={() => dispatch("animEnd")}
      />
    {/each}
  </table>

  <!-- <button class="btn btn-debug" on:click={testProgress}>Test</button> -->
</div>

<style>
  table {
    max-width: 800px;
    margin: auto;
  }
  h4 {
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .btn-debug {
    margin-top: 2rem;
  }
</style>
