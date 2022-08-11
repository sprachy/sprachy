<script lang="ts">
  import sprachy from "./sprachy"
  import { tweened } from "svelte/motion"
  import { cubicInOut } from "svelte/easing"

  const { effects } = sprachy.expectSPA()

  export let experience: number

  $: console.log(experience)

  let expStart = experience
  $: expGained = experience - expStart

  $: renderExp = tweened(expStart, {
    duration: expGained,
    easing: cubicInOut,
  })

  // Once the animation catches up, we use the new value for the next animation
  $: if ($renderExp >= experience) {
    expStart = experience
  }

  $: renderExp.set(experience)

  $: initialLevel = Math.floor(expStart / 1000)
  $: renderLevel = Math.floor($renderExp / 1000)
  $: fracProgress = ($renderExp % 1000) / 1000

  $: if (renderLevel > initialLevel) {
    effects.confetti.spawnAt(endpointRef)
  }

  let endpointRef: HTMLDivElement
</script>

<div class="d-flex align-items-center">
  <div class="expbar">
    <div class="expbar-fill" style:width={`${fracProgress * 100}%`} />
  </div>
  <div class="level ms-2" bind:this={endpointRef}>
    Lv {renderLevel}
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
