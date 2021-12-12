<script lang="ts">
  import DialogueExample from "./DialogueExample.svelte"
  import DialogueExampleMessage from "./DialogueExampleMessage.svelte"
  import Sprachdown from "./Sprachdown.svelte"

  export let node: HTMLElement
  let attrs: any = {}
  for (const key of node.getAttributeNames()) {
    attrs[key] = node.getAttribute(key)
  }
</script>

{#if node.tagName == "DIALOGUEEXAMPLE"}
  <DialogueExample>
    <Sprachdown source={node.innerHTML} />
  </DialogueExample>
{:else if node.tagName == "MSG"}
  <DialogueExampleMessage {...attrs} text={node.innerHTML} />
{:else}
  {@html node.outerHTML}
{/if}
