<script lang="ts">
  import DialogueExample from "./DialogueExample.svelte"
  import LTable from "./LTable.svelte"
  import Tip from "./Tip.svelte"
  import TextHighlighter from "./TextHighlighter.svelte"

  type Element = {
    tagName: string
    attribs: any
  }

  export let node: Element
  export let innerHtml: string
  export let outerHtml: string
  const attrs = node.attribs
</script>

{#if node.tagName == "dialogueexample"}
  <DialogueExample {...attrs} text={innerHtml} />
{:else if node.tagName == "tip"}
  <Tip {...attrs} text={innerHtml} />
{:else if node.tagName == "ltable"}
  <LTable {...attrs} text={innerHtml} />
{:else if node.tagName == "texthighlighter"}
  <TextHighlighter {...attrs} text={innerHtml} />
{:else}
  <!-- {@html node.outerHTML} -->
  {@html outerHtml}
{/if}
