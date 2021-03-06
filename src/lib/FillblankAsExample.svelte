<script lang="ts">
  import _ from "lodash"
  import Message from "$lib/Message.svelte"
  import type { FillblankLine, Pattern } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import sprachy from "$lib/sprachy"
  import SoundIndicator from "$lib/SoundIndicator.svelte"

  const { speech, user } = sprachy.spa || {}

  export let line: FillblankLine
  export let pattern: Pattern | null = null
  let playingSound: boolean = false

  $: parts = ((line: FillblankLine) => {
    const [before, after] = line.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  })(line)

  $: translation = ((line: FillblankLine) => {
    return line.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `**${highlight}**`
    })
  })(line)

  async function playSound() {
    if (!speech) return

    playingSound = true
    try {
      await speech.characterSpeak(
        line.from,
        line.message.replace(/[[_*]+/g, "")
      )
    } finally {
      playingSound = false
    }
  }
</script>

<Message from={line.from}>
  {#if $user?.enableSpeechSynthesis}
    <SoundIndicator playing={playingSound} on:click={playSound} />
  {/if}
  <Sprachdown inline source={parts.before} />
  <span class="fillblank">{line.canonicalAnswer}</span>
  <Sprachdown inline source={parts.after} />
  <div slot="after">
    <div class="translation">
      <Sprachdown inline source={translation} />
    </div>
  </div>
</Message>

<style>
  .translation :global(strong) {
    color: #86abff;
  }

  .translation {
    padding-top: 0.4rem;
    font-size: 90%;
    color: #444;
  }

  span.fillblank {
    color: #64b5f6;
  }
</style>
