<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import NextPatternHomeTile from "$lib/client/NextPatternHomeTile.svelte"
  import PracticeHomeTile from "$lib/client/PracticeHomeTile.svelte"
  import sprachy from "$lib/sprachy"
  import { dev } from "$app/env"
  import PatternIndex from "$lib/PatternIndex.svelte"

  async function debugResetProgress() {
    const { spa, api } = sprachy.expectSPA()
    const summary = await api.http.post(`/api/debug/reset-progress`)
    spa.receiveProgress(summary)
  }

  async function debugSkipTime() {
    const { spa, api } = sprachy.expectSPA()
    const summary = await api.http.post(`/api/debug/timeskip`)
    spa.receiveProgress(summary)
  }
</script>

<SiteLayout>
  {#if sprachy.spa}
    <div class="home">
      <div class="tiles">
        <NextPatternHomeTile />
        <PracticeHomeTile />
      </div>
      <hr />
      <div class="patterns">
        <h2>All patterns</h2>
        <PatternIndex />
        {#if dev}
          <hr />
          <div class="debug">
            <button
              class="btn btn-outline-warning"
              on:click={debugResetProgress}>Debug: Reset Progress</button
            >
            <button class="btn btn-outline-warning" on:click={debugSkipTime}
              >Debug: Skip Time</button
            >
          </div>
        {/if}
      </div>
    </div>
  {/if}
</SiteLayout>

<style lang="sass">
.tiles
  display: flex
</style>
