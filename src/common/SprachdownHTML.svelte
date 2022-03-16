<script lang="ts">
  import SprachdownNode from "./SprachdownNode.svelte";
  import { browser } from "$app/env";
  // @ts-ignore
  import { JSDOM } from "jsdom?server";

  let parser: DOMParser;
  if (browser) {
    parser = new DOMParser();
  } else {
    const dom = new JSDOM();
    parser = new dom.window.DOMParser();
  }

  export let text: string;
  const htmlDoc = parser.parseFromString(text, "text/html");
  const nodes = Array.from(htmlDoc.body.children);
</script>

{#each nodes as node}
  <SprachdownNode {node} />
{/each}
