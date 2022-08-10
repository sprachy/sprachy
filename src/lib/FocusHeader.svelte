<script lang="ts">
  import { faClose } from "@fortawesome/free-solid-svg-icons"
  import Fa from "svelte-fa"
  import MuteToggle from "$lib/MuteToggle.svelte"

  export let closeUrl: string
</script>

<div class="FocusHeader">
  <div>
    <a sveltekit:prefetch href={closeUrl} class="btn close">
      <Fa fw size="2x" icon={faClose} color="#ccc" />
    </a>
    <slot />
  </div>
  <div>
    <MuteToggle fw size="2x" color="#ccc" />
  </div>
</div>

<style>
  .FocusHeader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5vh;
  }

  .FocusHeader > div {
    display: flex;
    align-items: center;
  }
</style>
