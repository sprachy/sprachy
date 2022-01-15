<script lang="ts">
  import SiteHeader from "./SiteHeader.svelte"

  export let title: string | null = null
  export let noContainer: boolean = false
  export let fixedHeader: boolean = false
</script>

<svelte:head>
  {#if title}
    <title>{title} - Sprachy</title>
  {:else}
    <title>Sprachy</title>
  {/if}
</svelte:head>

<div class="site-layout" class:fixed-header={fixedHeader}>
  <SiteHeader />
  {#if noContainer}
    <slot />
  {:else}
    <main class="container">
      <slot />
    </main>
  {/if}
</div>

<style lang="sass">
.site-layout
  padding-bottom: 5rem

.site-layout.fixed-header
  :global(.site-header)
    position: fixed
    z-index: 1
    width: 100%

main
  padding-top: 1.5rem
</style>
