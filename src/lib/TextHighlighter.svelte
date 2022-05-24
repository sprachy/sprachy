<script lang="ts">
  import _ from "lodash"
  // import Sprachdown from "./Sprachdown.svelte"
  export let parts: string
  export let text: string
  import pixelWidth from "string-pixel-width"

  function estimateTextWidth(text: string) {
    return pixelWidth(text, { size: 16, font: "arial" })
  }

  type TextFragment =
    | {
        highlight: string
        text: string
        minWidth?: number
      }
    | {
        highlight?: undefined
        text: string
        minWidth?: undefined
      }

  $: highlights = parts.split(",").map((p) => p.trim())

  $: fragments = ((text: string, highlights: string[]) => {
    const fragments: TextFragment[] = []
    let highlightIndex = 0

    const matches = [...text.matchAll(/\[.+?\]/g)]
    let i = 0
    for (const m of matches) {
      if (!m || !m.index || !m[0]) continue
      fragments.push({
        text: text.slice(i, m.index),
      })

      const highlight = highlights[highlightIndex]!
      const bit = m[0].slice(1, -1)
      fragments.push({
        highlight: highlight,
        minWidth:
          highlight.length > bit.length
            ? estimateTextWidth(highlight)
            : undefined,
        text: bit,
      })
      highlightIndex += 1
      i = m.index + m[0].length
    }

    return fragments
  })(text, highlights)
</script>

<div class="TextHighlighter">
  {#each fragments as fragment}
    {#if fragment.highlight}
      <span
        class={`highlight ${fragment.highlight}`}
        style={fragment.minWidth
          ? `min-width: ${fragment.minWidth}px`
          : undefined}
      >
        {fragment.text}
      </span>
    {:else}
      {fragment.text}
    {/if}
  {/each}
  <!-- <Sprachdown source={"<p>" + text + "</p>"} /> -->
</div>

<style>
  .TextHighlighter {
    padding-bottom: 30px;
    margin-bottom: 1rem;
  }

  .TextHighlighter span.highlight {
    display: inline-block;
    font-weight: bold;
    text-align: center;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }

  .TextHighlighter span.highlight::after {
    font-weight: normal;
    font-size: 16px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    white-space: nowrap;
  }

  .TextHighlighter :global(span.actor) {
    color: #a56eff;
    position: relative;
  }
  .TextHighlighter :global(span.actor)::after {
    content: "actor";
  }

  .TextHighlighter :global(span.indirectobject) {
    color: #005d5d;
    position: relative;
  }
  .TextHighlighter :global(span.indirectobject)::after {
    content: "indirect object";
  }

  .TextHighlighter :global(span.directobject) {
    color: #9f1853;
    position: relative;
  }
  .TextHighlighter :global(span.directobject)::after {
    content: "direct object";
  }
</style>
