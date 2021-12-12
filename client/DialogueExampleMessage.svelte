<script lang="ts">
  import Message from "./Message.svelte"

  export let from: string
  export let text: string

  $: lines = text.trim().split("\n")
  $: original = lines[0]!.trim()
  $: translation = lines[1]!.trim()
</script>

<Message {from}>
  {original}
  <template v-slot:translation>{translation}</template>
</Message>
