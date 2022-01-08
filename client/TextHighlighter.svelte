<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "./Sprachdown.svelte"
  export let parts: string
  export let text: string

  function calculateTextWidth(text: string) {
    const element = document.createElement("canvas")
    const ctx = element.getContext("2d")!
    ctx.font = `17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
    return ctx.measureText(text).width
  }

  type TextFragment =
    | {
        highlight: string
        minWidth: number
        textOffset: number
        text: string
      }
    | {
        highlight?: undefined
        minWidth?: undefined
        textOffset?: undefined
        text: string
      }

  $: highlights = parts.split(",").map((p) => p.trim())

  $: fragments = ((text: string, highlights: string[]) => {
    const fragments: TextFragment[] = []
    let highlightIndex = 0
    for (const bit of text.split(/(?<=\[.+?\])|(?=\[.+?\])/g)) {
      if (bit[0] === "[") {
        const highlight = highlights[highlightIndex]!
        const text = bit.slice(1, -1)
        const textWidth = calculateTextWidth(text)
        const highlightWidth = calculateTextWidth(highlight)
        const minWidth = Math.max(textWidth, highlightWidth)
        fragments.push({
          highlight: highlight,
          textOffset: Math.max(0, highlightWidth - textWidth) / 2,
          minWidth: minWidth,
          text: text,
        })
        highlightIndex += 1
      } else {
        fragments.push({
          text: bit,
        })
      }
    }
    return fragments
  })(text, highlights)
</script>

<div class="TextHighlighter">
  {#each fragments as fragment}
    {#if fragment.highlight}
      <span class={`highlight ${fragment.highlight}`} style={`min-width: ${fragment.minWidth}px`}>
        <span style={`position: relative; left: ${fragment.textOffset}px`}>{fragment.text}</span>
      </span>
    {:else}
      {fragment.text}
    {/if}
  {/each}
  <!-- <Sprachdown source={"<p>" + text + "</p>"} /> -->
</div>

<style lang="sass">
.TextHighlighter
  padding-bottom: 30px
  margin-bottom: 1rem

  span.highlight
    display: inline-block

  :global(span.actor)
    color: green
    position: relative  
    &::after
      content: "actor"
      position: absolute
      left: 50%
      transform: translateX(-50%)
      top: 100%
      white-space: nowrap


  :global(span.indirectobject)
    color: orange
    position: relative  
    &::after
      content: "indirect object"
      position: absolute
      left: 50%
      transform: translateX(-50%)
      top: 100%
      white-space: nowrap

  :global(span.directobject)
    color: red
    position: relative  
    &::after
      content: "direct object"
      position: absolute
      left: 50%
      transform: translateX(-50%)
      top: 100%
      white-space: nowrap
</style>
