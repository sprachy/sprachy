<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "./Sprachdown.svelte"

  export let text: string
  export let title: string
</script>

<div class="alert alert-info">
  {#if title}
    <h5>{title}</h5>
  {/if}
  <Sprachdown source={text} />
</div>

<style lang="sass">
  .alert :global(p):last-child
    margin-bottom: 0
</style>
