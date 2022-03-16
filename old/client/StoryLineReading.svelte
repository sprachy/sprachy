<script lang="ts">
  import _ from "lodash"
  import Message from "./Message.svelte"
  import type { Line } from "$lib/Pattern"
  import Sprachdown from "./Sprachdown.svelte"

  export let line: Line
  export let flip: boolean = false
</script>

<Message from={line.from} {flip}>
  {line.message}
  <div slot="after">
    <div class="translation">
      {@html line.translation}
    </div>
    {#if line.explanation}
      <div class="explanation">
        <Sprachdown inline source={line.explanation} />
      </div>
    {/if}
  </div>
</Message>

<style lang="sass">
.explanation
  padding-top: 0.8rem
  color: #444
  font-size: 90%
  color: #0b9bc7
</style>
