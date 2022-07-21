<script lang="ts">
  import SiteHeader from "./SiteHeader.svelte"
  import { sprachdex } from "./sprachdex"
  import successImg from "$lib/img/success.webp"

  export let title: string | null = null
  export let noContainer: boolean = false
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

<div class="site-layout">
  <SiteHeader fixed={fixedHeader} />
  {#if noContainer}
    <slot />
  {:else}
    <main class="container">
      <slot />
    </main>
  {/if}
</div>

<style>
  .site-layout {
    padding-bottom: 5rem;
  }

  main {
    padding-top: 1.5rem;
  }
</style>
