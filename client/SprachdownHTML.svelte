<script lang="ts">
  import SprachdownNode from "./SprachdownNode.svelte"

  export let text: string
  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(text, "text/html")
  const nodes = htmlDoc.body.children
</script>

{#each nodes as node, i}
  <SprachdownNode {node} />
{/each}
