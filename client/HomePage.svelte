<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"
  import { IS_PRODUCTION } from "./settings"
  import PatternItem from "./PatternItem.svelte"
  import NextPatternHomeTile from "./NextPatternHomeTile.svelte"
  import PracticeHomeTile from "./PracticeHomeTile.svelte"

  let patterns = sprachy.app.patternsAndProgress

  $: chapter1Patterns = patterns.filter((p) => p.id !== "intro")

  async function debugResetProgress() {
    const summary = await sprachy.api.http.post(`/api/debug/reset-progress`)
    sprachy.app.receiveProgress(summary)
    patterns = sprachy.app.patternsAndProgress
  }

  async function debugSkipTime() {
    const summary = await sprachy.api.http.post(`/api/debug/timeskip`)
    sprachy.app.receiveProgress(summary)
    patterns = sprachy.app.patternsAndProgress
  }
</script>

<SiteLayout>
  <div class="home">
    <div class="tiles">
      <NextPatternHomeTile />
      <PracticeHomeTile />
    </div>
    <!-- <section class="chapter">
      <header>
        <h2>Introduction</h2>
      </header>
      <PatternItem pattern={introPattern} />
    </section> -->
    <div class="patterns">
      <section class="chapter">
        <h2>All patterns</h2>
        <ul>
          {#each chapter1Patterns as pattern (pattern.id)}
            <PatternItem {pattern} />
          {/each}
        </ul>
      </section>
      <section class="chapter">
        <p><em>More patterns coming soon!</em></p>
      </section>
      {#if !IS_PRODUCTION}
        <div class="debug">
          <button class="btn btn-outline-warning" on:click={debugResetProgress}
            >Debug: Reset Progress</button
          >
          <button class="btn btn-outline-warning" on:click={debugSkipTime}>Debug: Skip Time</button>
        </div>
      {/if}
    </div>
  </div>
</SiteLayout>

<style lang="sass">
.chapter
  // header
  //   text-align: center

  ul
    padding: 0

.chapter:not(:first-child)
  margin-top: 1rem
  border-top: 1px solid #ccc
  padding-top: 1rem

.tiles
  display: flex

.patterns
  padding: 1rem

  ul
    display: flex
    flex-wrap: wrap
  
  ul :global(li)
    flex-basis: 50%

@media only screen and (max-width: 768px)
  .patterns ul :global(li)
    flex-basis: 100%
</style>
