<script lang="ts">
  import _ from "lodash"
  import SvelteMarkdown from "svelte-markdown"
  import SprachdownHTML from "./SprachdownHTML.svelte"

  export let source: string

  // export let inline: boolean = false

  // $: template = inline
  //   ? `<span>` + sprachdown.parseInline(content) + `</span>`
  //   : `<div>` + sprachdown.parse(content) + `</div>`
</script>

<SvelteMarkdown {source} renderers={{ html: SprachdownHTML }} />
