<script lang="ts">
  import SiteHeader from "./SiteHeader.svelte"

  export let title: string | null = null
  export let noContainer: boolean = false
</script>

<svelte:head>
  {#if title}
    <title>{title} - Sprachy</title>
  {:else}
    <title>Sprachy</title>
  {/if}
</svelte:head>

<div class="site-layout">
  <SiteHeader />
  {#if noContainer}
    <slot />
  {:else}
    <div class="container" id="main">
      <slot />
    </div>
  {/if}
</div>

<style lang="sass">
.site-layout
  padding-bottom: 5rem

#main
  padding-top: 1.5rem
</style>
