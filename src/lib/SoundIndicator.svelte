<script lang="ts">
  import Fa from "svelte-fa"
  import {
    faVolumeHigh,
    faVolumeLow,
    faSpinner,
  } from "@fortawesome/free-solid-svg-icons"

  export let playing: boolean = false
  export let loading: boolean = false
  let icon = faVolumeHigh
  let interval: ReturnType<typeof setInterval> | null = null

  $: if (playing && !interval) {
    interval = setInterval(() => {
      icon = icon === faVolumeHigh ? faVolumeLow : faVolumeHigh
    }, 200)
  } else if (!playing && interval) {
    icon = faVolumeHigh
    clearInterval(interval)
    interval = null
  }
</script>

<div class="SoundIndicator" on:click|preventDefault>
  {#if loading}
    <Fa icon={faSpinner} spin pull="left" size="sm" />
  {:else}
    <Fa {icon} pull="left" size="sm" />
  {/if}
</div>

<style>
  .SoundIndicator {
    display: inline-block;
    width: 21px;
    margin-right: 0.2rem;
  }

  .SoundIndicator :global(svg) {
    cursor: pointer;
    color: #666;
  }
</style>
