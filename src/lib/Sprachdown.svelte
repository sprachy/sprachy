<script lang="ts">
  import _ from "lodash"
  import SvelteMarkdown from "svelte-markdown"
  import SprachdownHTML from "./SprachdownHTML.svelte"

  export let source: string

  export let inline: boolean = false // SvelteMarkdown doesn't seem to support this atm, despite claiming to

  // const parsedSource = source.replace(/=[^=\n]+=/, (substring) => {
  //   const highlight = substring.slice(1, -1)
  //   return `<InlineTranslation original="${highlight}"/>`
  // })
</script>

<div class:markdown={true} class:markdown-inline={inline} {...$$restProps}>
  <SvelteMarkdown {source} renderers={{ html: SprachdownHTML }} />
</div>

<style>
  .markdown-inline {
    display: inline;
  }

  .markdown-inline :global(p) {
    margin: 0;
    display: inline;
  }
</style>
