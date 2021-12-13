<script lang="ts">
  import _ from "lodash"
  import SvelteMarkdown from "svelte-markdown"
  import SprachdownHTML from "./SprachdownHTML.svelte"

  export let source: string

  export let inline: boolean = false // SvelteMarkdown doesn't seem to support this atm, despite claiming to
</script>

<div class:markdown={true} class:markdown-inline={inline}>
  <SvelteMarkdown {source} renderers={{ html: SprachdownHTML }} />
</div>

<style lang="sass">
.markdown-inline :global(p)
  margin: 0
</style>
