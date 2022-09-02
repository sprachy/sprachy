<script lang="ts">
  /** Page title for <title> element and embed cards */
  export let title: string
</script>

<svelte:head>
  {#if title === "Sprachy"}
    <title>Sprachy</title>
  {:else}
    <title>{title} - Sprachy</title>
  {/if}
</svelte:head>

<slot />
