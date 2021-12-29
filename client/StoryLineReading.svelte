<script lang="ts">
  import _ from "lodash"
  import Message from "./Message.svelte"
  import type { Line } from "../common/Pattern"

  export let line: Line
</script>

<Message from={line.from}>
  {line.message}
  <div slot="after">
    <div class="translation">
      {@html line.translation}
    </div>
  </div>
</Message>

<style lang="sass">

</style>
