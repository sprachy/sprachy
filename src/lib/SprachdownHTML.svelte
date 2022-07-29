<script lang="ts">
  import SprachdownNode from "./SprachdownNode.svelte"
  import { parseDocument } from "htmlparser2"
  export let text: string

  // domhandler doesn't have correct type defs
  type Element = {
    startIndex: number
    endIndex: number
    tagName: string
    attribs: any
  }

  const dom = parseDocument(text, {
    withStartIndices: true,
    withEndIndices: true,
  })
  const nodes = dom.children as Element[]

  function getInnerHTML(node: Element) {
    const slice = text.slice(node.startIndex!, node.endIndex!)
    const m = slice.match(/>([\s\S]*)</)
    return m ? m[1]! : ""
  }

  function getOuterHTML(node: Element) {
    return text.slice(node.startIndex!, node.endIndex! + 1)
  }
</script>

{#each nodes as node}
  <SprachdownNode
    {node}
    innerHtml={getInnerHTML(node)}
    outerHtml={getOuterHTML(node)}
  />
{/each}
