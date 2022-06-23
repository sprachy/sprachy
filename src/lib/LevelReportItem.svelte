<script lang="ts">
  import sprachy from "./sprachy"
  import { tweened } from "svelte/motion"
  import { cubicInOut } from "svelte/easing"
  import { createEventDispatcher, onMount } from "svelte"

  const { effects } = sprachy.expectSPA()

  export let title: string
  export let expStart: number
  export let expGained: number
  let key = title
  const dispatch = createEventDispatcher()

  let renderExp = tweened(expStart, {
    duration: expGained,
    easing: cubicInOut,
  })

  $: level = Math.floor($renderExp / 1000)
  $: fracProgress = ($renderExp % 1000) / 1000

  $: if (level) {
    effects.confetti.spawnAt(endpointRef)
  }

  let endpointRef: HTMLDivElement

  onMount(() => {
    testProgress()
  })

  export async function testProgress() {
    await renderExp.set(expStart, { duration: 0 })
    await renderExp.set(expStart + expGained)
    dispatch("animEnd")
  }
</script>

{#key key}
  <tr class="item">
    <td>
      <h6>{title}</h6>
    </td>
    <td>
      <div class="d-flex align-items-center">
        <div class="expbar">
          <div class="expbar-fill" style:width={`${fracProgress * 100}%`} />
        </div>
        <div class="level ms-2" bind:this={endpointRef}>Level {level}</div>
      </div>
    </td>
  </tr>
{/key}

<style>
  .item {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  td:first-child {
    white-space: nowrap;
    text-align: right;
    padding-right: 0.5rem;
  }

  td:last-child {
    width: 100%;
  }

  h6 {
    margin: 0;
    margin-top: -2px;
    font-weight: normal;
    font-size: 1.1rem;
  }

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
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #00bcd4;
  }
</style>
