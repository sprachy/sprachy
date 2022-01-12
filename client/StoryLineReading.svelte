<script lang="ts">
  import _ from "lodash"
  import Message from "./Message.svelte"
  import type { Line } from "../common/Pattern"

  export let line: Line
  export let flip: boolean = false
</script>

<Message from={line.from} {flip}>
  {line.message}
  <div slot="after">
    <div class="translation">
      {@html line.translation}
    </div>
  </div>
</Message>

<style lang="sass">

</style>
