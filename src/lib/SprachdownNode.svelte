<script lang="ts">
  import DialogueExample from "./DialogueExample.svelte"
  import LTable from "./LTable.svelte"
  import Tip from "./Tip.svelte"
  import TextHighlighter from "./TextHighlighter.svelte"

  export let node: Element
  let attrs: any = {}
  for (const key of node.getAttributeNames()) {
    attrs[key] = node.getAttribute(key)
  }
</script>

{#if node.tagName == "DIALOGUEEXAMPLE"}
  <DialogueExample {...attrs} text={node.innerHTML} />
{:else if node.tagName == "TIP"}
  <Tip {...attrs} text={node.innerHTML} />
{:else if node.tagName == "LTABLE"}
  <LTable {...attrs} text={node.innerHTML} />
{:else if node.tagName == "TEXTHIGHLIGHTER"}
  <TextHighlighter {...attrs} text={node.innerHTML} />
{:else}
  {@html node.outerHTML}
{/if}
