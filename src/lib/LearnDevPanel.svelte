<script lang="ts">
  import sprachy from "$lib/sprachy"
  import type { Learnable } from "./client/SprachyUserSPA"

  const spa = sprachy.expectSPA()

  async function resetProgress() {
    await spa.reallyResetAllUserProgress()
  }

  export let learning: Learnable
  let openPanel: boolean = false

  async function gainLevel() {
    await spa.gainPatternExperience(learning.pattern.id, 1000)
  }

  function togglePanel() {
    openPanel = !openPanel
  }
</script>

<div class="devpanel mt-auto">
  {#if openPanel}
    <div class="card p-4">
      <button class="btn btn-success" on:click={gainLevel}> Gain level </button>
      <button class="btn btn-danger mt-2" on:click={resetProgress}
        >Reset all progress</button
      >
    </div>
  {/if}
  <button class="btn" on:click={togglePanel}>Dev Options</button>
</div>

<style>
</style>
