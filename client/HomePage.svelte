<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"
  import { IS_PRODUCTION } from "./settings"
  import PatternItem from "./PatternItem.svelte"

  let patterns = sprachy.app.patternsAndProgress

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
  <section class="chapter">
    <header>
      <h2>Chapter 1</h2>
      <p>Cases and noun genders</p>
      <p>Ein mysteriöses Eichhörnchen taucht auf</p>
    </header>

    <ul>
      {#each patterns as pattern (pattern.id)}
        <PatternItem {pattern} />
      {/each}
    </ul>
  </section>
  <hr />
  <p><em>More patterns coming soon!</em></p>
  {#if !IS_PRODUCTION}
    <div class="debug">
      <button class="btn btn-outline-warning" on:click={debugResetProgress}
        >Debug: Reset Progress</button
      >
      <button class="btn btn-outline-warning" on:click={debugSkipTime}>Debug: Skip Time</button>
    </div>
  {/if}
</SiteLayout>

<style lang="sass">
.chapter
  margin-top: 1rem
  border-top: 1px solid #ccc
  padding-top: 1rem

  header
    text-align: center

  ul
    padding: 0
    width: fit-content
    margin: auto
</style>
