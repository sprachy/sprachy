<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "./Sprachdown.svelte"

  export let text: string
</script>

<div class="alert alert-info d-flex">
  <Sprachdown source={text} />
</div>

<style lang="sass">
  .alert :global(p):last-child
    margin-bottom: 0
</style>
