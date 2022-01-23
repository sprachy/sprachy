<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"
  import { IS_PRODUCTION } from "./settings"
  import PatternItem from "./PatternItem.svelte"

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
    <!-- <section class="chapter">
      <header>
        <h2>Introduction</h2>
      </header>
      <PatternItem pattern={introPattern} />
    </section> -->
    <section class="chapter">
      <!-- <header>
        <h2>Chapter 1</h2>
        <p>Cases and noun genders</p>
        <p>Ein mysteriöses Eichhörnchen taucht auf</p>
      </header> -->

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

</style>
