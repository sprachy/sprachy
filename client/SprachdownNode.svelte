<script lang="ts">
  import DialogueExample from "./DialogueExample.svelte"
  import LTable from "./LTable.svelte"

  export let node: HTMLElement
  let attrs: any = {}
  for (const key of node.getAttributeNames()) {
    attrs[key] = node.getAttribute(key)
  }
</script>

{#if node.tagName == "DIALOGUEEXAMPLE"}
  <DialogueExample {...attrs} text={node.innerHTML} />
{:else if node.tagName == "LTABLE"}
  <LTable {...attrs} text={node.innerHTML} />
{:else}
  {@html node.outerHTML}
{/if}
