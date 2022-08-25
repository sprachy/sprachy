<script lang="ts">
  import SiteHeader from "./SiteHeader.svelte"
  import { sprachdex } from "./sprachdex"
  import successImg from "$lib/img/success.webp"

  export let title: string | null = null
  export let fixedHeader: boolean = false
</script>

<svelte:head>
  {#each sprachdex.characters as character}
    <link rel="preload" as="image" href={character.avatar} />
  {/each}
  <link rel="preload" as="image" href={successImg} />
  {#if title}
    <title>{title} - Sprachy</title>
  {:else}
    <title>Sprachy</title>
  {/if}
</svelte:head>

<div class="SiteLayout" class:fixedHeader>
  <SiteHeader fixed={fixedHeader} />
  <slot />
</div>

<style>
  .SiteLayout {
    height: 100%;
  }

  .SiteLayout.fixedHeader {
    padding-top: 62px;
  }
</style>
