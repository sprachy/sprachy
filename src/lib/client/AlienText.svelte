<script lang="ts">
  import { onMount } from "svelte"

  export let source: string

  function generatePath() {
    let firstPoint = true
    const points = [
      " 10 10 ",
      " 10 20 ",
      " 10 30 ",
      " 20 10 ",
      " 20 20 ",
      " 20 30",
    ]
    const length = 4 + Math.floor(Math.random() * 3)

    let path = ""
    for (let p = 0; p < length; p++) {
      const pointIX = Math.floor(Math.random() * points.length)
      path += (firstPoint ? "M" : "L") + points[pointIX]
      points.splice(pointIX, 1)
      firstPoint = false
    }

    return path + " z"
  }

  let revealedChars = 0
  let paths: string[] = []

  let animation: number
  let start: number
  let timeToFullReveal = 1000
  function frame(timestamp: number) {
    start = start || timestamp
    const timePassed = timestamp - start

    revealedChars = Math.min(
      source.length,
      Math.floor((timePassed / timeToFullReveal) * source.length)
    )
    console.log(timePassed, revealedChars, source.length)

    paths = []
    for (let i = 0; i < revealedChars; i++) {
      paths.push(generatePath())
    }

    if (revealedChars < source.length) {
      requestAnimationFrame(frame)
    }
  }

  onMount(() => {
    animation = requestAnimationFrame(frame)
  })

  // svg.innerHTML = '<path d="' + path + ' z" />'
</script>

<div>
  {#each paths as path}
    <svg viewBox="7 7 16 32">
      <path d={path} />
    </svg>
  {/each}
</div>

<style>
  svg {
    width: 8px;
  }
  path {
    fill: #333;
    stroke: #333;
    stroke-width: 2px;
  }
</style>
