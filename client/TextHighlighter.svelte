<script lang="ts">
  import _ from "lodash"
  import LTableTranslation from "./LTableTranslation.svelte"
  import Sprachdown from "./Sprachdown.svelte"
  export let text: string
</script>

<div class="TextHighlighter">
  <Sprachdown source={"<p>" + text + "</p>"} />
</div>

<style lang="sass">
.TextHighlighter
  margin-bottom: 2rem

  :global(span.actor)
    color: green
    position: relative  
    &::after
      content: "actor"
      position: absolute
      left: 50%
      transform: translateX(-50%)
      top: 100%
      white-space: nowrap


  :global(span.indirectobject)
    color: orange
    position: relative  
    &::after
      content: "indirect object"
      position: absolute
      left: 50%
      transform: translateX(-50%)
      top: 100%
      white-space: nowrap

  :global(span.directobject)
    color: red
    position: relative  
    &::after
      content: "direct object"
      position: absolute
      left: 50%
      transform: translateX(-50%)
      top: 100%
      white-space: nowrap
</style>
