<script lang="ts">
  import type { PatternId } from "./Pattern"
  import LevelReportItem from "./LevelReportItem.svelte"
  import { createEventDispatcher } from "svelte"
  import sprachy from "./sprachy"

  export let experienceByPatternId: Record<PatternId, number>

  const { patternsAndProgress } = sprachy.expectSPA()

  const dispatch = createEventDispatcher()

  $: gainingPatterns = $patternsAndProgress.filter(
    (p) => p.id in experienceByPatternId
  )

  $: items = gainingPatterns.map((p) => {
    const experience = experienceByPatternId[p.id]!
    return {
      title: p.title,
      expStart: p.progress.experience - experience,
      expGained: experience,
    }
  })

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
