<script lang="ts">
  import _ from "lodash"
  import SvelteMarkdown from "svelte-markdown"
  import SprachdownHTML from "./SprachdownHTML.svelte"

  export let source: string

  export const inline: boolean = false // SvelteMarkdown doesn't seem to support this atm, despite claiming to

  // $: template = inline
  //   ? `<span>` + sprachdown.parseInline(content) + `</span>`
  //   : `<div>` + sprachdown.parse(content) + `</div>`
</script>

<SvelteMarkdown {source} renderers={{ html: SprachdownHTML }} />
