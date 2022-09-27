<script lang="ts">
  import type { Learnable } from "$lib/client/SprachyUserSPA"
  import LevelBar from "$lib/LevelBar.svelte"
  import LearnDevPanel from "$lib/LearnDevPanel.svelte"
  import sprachy from "./sprachy"
  import { dev } from "$app/env"

  const spa = sprachy.expectSPA()
  const { progressByPatternId } = spa

  export let learning: Learnable
  $: experience = $progressByPatternId[learning.pattern.id]!.experience
</script>

<div class="sidebar">
  <div class="overview">
    <div>{learning.why}</div>
    {#key learning.pattern.id}
      <LevelBar {experience} />
    {/key}
    {#if learning.type === "dialogue"}
      <small class="text-secondary"
        >&lt;&lt; Press Enter to continue dialogue &gt;&gt;</small
      >
    {/if}
  </div>

  {#if dev}
    <LearnDevPanel {learning} />
  {/if}
</div>

<style>
  .sidebar {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    padding: 1rem;
    padding-top: 5rem;
    border-right: 1px solid #ccc;
    z-index: 1;
    background-color: white;
    width: 300px;

    display: flex;
    flex-direction: column;
  }
</style>
