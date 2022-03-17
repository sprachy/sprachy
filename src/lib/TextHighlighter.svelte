<script lang="ts">
  import _ from "lodash";
  // import Sprachdown from "./Sprachdown.svelte"
  export let parts: string;
  export let text: string;
  import pixelWidth from "string-pixel-width";

  function estimateTextWidth(text: string) {
    return pixelWidth(text, { size: 16, font: "Helvetica" });
  }

  type TextFragment =
    | {
        highlight: string;
        text: string;
        minWidth?: number;
      }
    | {
        highlight?: undefined;
        text: string;
        minWidth?: undefined;
      };

  $: highlights = parts.split(",").map((p) => p.trim());

  $: fragments = ((text: string, highlights: string[]) => {
    const fragments: TextFragment[] = [];
    let highlightIndex = 0;

    const matches = [...text.matchAll(/\[.+?\]/g)];
    let i = 0;
    for (const m of matches) {
      if (!m || !m.index || !m[0]) continue;
      fragments.push({
        text: text.slice(i, m.index),
      });

      const highlight = highlights[highlightIndex]!;
      const bit = m[0].slice(1, -1);
      fragments.push({
        highlight: highlight,
        minWidth:
          highlight.length > bit.length
            ? estimateTextWidth(highlight)
            : undefined,
        text: bit,
      });
      highlightIndex += 1;
      i = m.index + m[0].length;
    }

    return fragments;
  })(text, highlights);
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

<style lang="sass">
.TextHighlighter
  padding-bottom: 30px
  margin-bottom: 1rem

  span.highlight
    display: inline-block
    font-weight: bold
    text-align: center
    margin-left: 0.2rem
    margin-right: 0.2rem

    &::after
      font-weight: normal
      font-size: 16px
      position: absolute
      left: 50%
      transform: translateX(-50%)
      top: 100%
      white-space: nowrap

  :global(span.actor)
    color: #a56eff
    position: relative  
    &::after
      content: "actor"

  :global(span.indirectobject)
    color: #005d5d
    position: relative  
    &::after
      content: "indirect object"

  :global(span.directobject)
    color: #9f1853
    position: relative  
    &::after
      content: "direct object"
</style>
