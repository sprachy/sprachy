<script lang="ts">
  import _ from "lodash"
  import Sprachdown from "./Sprachdown.svelte"

  export let text: string
  export let title: string = "Tip"

  const textWithTitle = `**${title}**: ${text}`
</script>

<div class="tip alert alert-info">
  <Sprachdown source={textWithTitle} />
</div>

<style>
  .tip {
    background-color: transparent;
    border: 2px solid #64b5f6;
    color: #333;
  }

  .tip :global(strong) {
    color: #64b5f6 !important;
  }

  .tip :global(p):last-child {
    margin-bottom: 0;
  }
</style>
