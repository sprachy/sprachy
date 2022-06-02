<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import sprachy from "$lib/sprachy"
  import { dev } from "$app/env"
  import PatternIndex from "$lib/PatternIndex.svelte"
  const spa = sprachy.expectSPA()
  const { api } = spa

  async function debugResetProgress() {
    const summary = await api.http.post(`/api/debug/reset-progress`)
    spa.receiveProgress(summary)
  }

  async function debugSkipTime() {
    const summary = await api.http.post(`/api/debug/timeskip`)
    spa.receiveProgress(summary)
  }
</script>

<SiteLayout>
  <div class="home">
    <hr />
    <div class="patterns">
      <h2>All patterns</h2>
      <PatternIndex />
      {#if dev}
        <hr />
        <div class="debug">
          <button class="btn btn-outline-warning" on:click={debugResetProgress}
            >Debug: Reset Progress</button
          >
          <button class="btn btn-outline-warning" on:click={debugSkipTime}
            >Debug: Skip Time</button
          >
        </div>
      {/if}
    </div>
  </div>
</SiteLayout>
