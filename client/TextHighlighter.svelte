<script lang="ts">
  import _ from "lodash"
  import LTableTranslation from "./LTableTranslation.svelte"
  import Sprachdown from "./Sprachdown.svelte"
  export let parts: string
  export let text: string

  type TextFragment = {
    highlight?: string
    text: string
  }

  $: highlights = parts.split(",").map((p) => p.trim())

  $: fragments = ((text: string, highlights: string[]) => {
    const fragments: TextFragment[] = []
    const highlightIndex = 0
    for (const bit of text.split(/(?<=\[.+?\])|(?=\[.+?\])/g)) {
      if (bit[0] === "[") {
        fragments.push({
          highlight: highlights[highlightIndex],
          text: bit.slice(1, -1),
        })
      } else {
        fragments.push({
          text: bit,
        })
      }
    }
  })(text, highlights)
</script>

<div class="TextHighlighter">
  <Sprachdown source={"<p>" + text + "</p>"} />
</div>

<style lang="sass">
.TextHighlighter
  margin-bottom: 2rem

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
