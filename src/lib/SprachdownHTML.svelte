<script lang="ts">
  import SprachdownNode from "./SprachdownNode.svelte";
  import { browser } from "$app/env";
  import { parseDocument } from "htmlparser2";
  import type { Element } from "domhandler";
  export let text: string;

  const dom = parseDocument(text, {
    withStartIndices: true,
    withEndIndices: true,
  });
  const nodes = dom.children as Element[];

  function getInnerHTML(node: Element) {
    const slice = text.slice(node.startIndex, node.endIndex);
    const m = slice.match(/>([\s\S]*)</);
    return m ? m[1] : "";
  }

  function getOuterHTML(node: Element) {
    return text.slice(node.startIndex, node.endIndex + 1);
  }

  // @ts-ignore
  // import { JSDOM } from "jsdom?server";

  // let parser: DOMParser;
  // if (browser) {
  //   parser = new DOMParser();
  // } else {
  //   const dom = new JSDOM();
  //   parser = new dom.window.DOMParser();
  // }

  // const htmlDoc = parser.parseFromString(text, "text/html");
  // const nodes = Array.from(htmlDoc.body.children);
</script>

{#each nodes as node}
  <SprachdownNode
    {node}
    innerHtml={getInnerHTML(node)}
    outerHtml={getOuterHTML(node)}
  />
{/each}
