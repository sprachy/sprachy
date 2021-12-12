<script lang="ts">
  import SiteHeader from "./SiteHeader.svelte"

  export let title: string | null = null
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
  <div class="container" id="main">
    <slot />
  </div>
</div>

<style lang="sass">
.site-layout
  padding-bottom: 5rem

#main
  padding-top: 1.5rem
</style>
