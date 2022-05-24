<script lang="ts">
  import Message from "./Message.svelte"
  import Sprachdown from "./Sprachdown.svelte"

  export let text: string

  const blocks = text.split(/(?=^\w+:)/gm).filter((b) => b.trim().length)

  const messages = blocks.map((b) => {
    const lines = b.split("\n")
    return {
      from: lines[0]!.trim().split(":")[0]!,
      original: lines[1]!.trim(),
      translation: lines[2]!.trim(),
    }
  })
</script>

<div class="dialogue">
  {#each messages as message}
    <Message from={message.from}>
      <Sprachdown inline source={message.original} />
      <div class="translation" slot="after">
        <Sprachdown inline source={message.translation} />
      </div>
    </Message>
  {/each}
</div>

<style>
  .dialogue {
    margin-bottom: 1rem;
  }

  .dialogue :global(.message):not(:first-child) {
    margin-top: 10px;
  }

  .translation {
    font-size: 90%;
    color: #444;
  }
</style>
