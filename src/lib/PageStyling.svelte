<script lang="ts">
  export let hideHeader: boolean = false
  export let fixedHeader: boolean = false
</script>

<svelte:head>
  {#if fixedHeader}
    <style>
      .site-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
      }
    </style>
  {/if}
  {#if hideHeader}
    <style>
      .site-header {
        display: none;
      }
    </style>
  {/if}
</svelte:head>
