<script lang="ts">
  import sprachy from "./sprachy"
  import { tweened } from "svelte/motion"
  import { cubicInOut } from "svelte/easing"

  const { effects } = sprachy.expectSPA()

  function levelFromExperience(exp: number) {
    return Math.floor(exp / 1000)
  }

  export let experience: number
  let shownExp = tweened(experience, {
    duration: 500,
    easing: cubicInOut,
  })
  let prevLevel = levelFromExperience(experience)

  $: shownExp.set(experience)
  $: shownLevel = levelFromExperience($shownExp)
  $: fracProgress = ($shownExp % 1000) / 1000

  $: if (shownLevel > prevLevel) {
    effects.confetti.spawnAt(endpointRef)
    prevLevel = shownLevel
  }

  let endpointRef: HTMLDivElement
</script>

<div class="d-flex align-items-center">
  <div class="expbar">
    <div class="expbar-fill" style:width={`${fracProgress * 100}%`} />
  </div>
  <div class="level ms-2" bind:this={endpointRef}>
    Lv {shownLevel}
  </div>
</div>

<style>
  .expbar {
    position: relative;
    flex-grow: 1;
    height: 15px;
    background: #f5f5f5;
    border-radius: 5px;
    margin: 10px 0;
    display: flex;
  }

  .expbar-fill {
    position: absolute;
    height: 100%;
    background: #00bcd4;
    border-radius: 5px;
  }

  .level {
    height: 30px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
