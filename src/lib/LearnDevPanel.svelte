<script lang="ts">
  import sprachy from "$lib/sprachy"

  const spa = sprachy.expectSPA()

  async function resetProgress() {
    await spa.reallyResetAllUserProgress()
  }

  let openPanel: boolean = false

  async function skip() {
    spa.skipCurrentLearning()
  }

  async function advanceTime() {
    spa.devTimeSkip()
  }

  function togglePanel() {
    openPanel = !openPanel
  }
</script>

<div class="devpanel mt-auto">
  {#if openPanel}
    <div class="card p-4">
      <button class="btn btn-success mt-2" on:click={skip}>Skip current</button>
      <button class="btn btn-secondary mt-2" on:click={advanceTime}
        >Advance time for reviews</button
      >
      <button class="btn btn-danger mt-2" on:click={resetProgress}
        >Reset all progress</button
      >
    </div>
  {/if}
  <button class="btn" on:click={togglePanel}>Dev Options</button>
</div>

<style>
</style>
