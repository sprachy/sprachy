<script lang="ts">
  import _ from "lodash"
  import Message from "$lib/Message.svelte"
  import type { ReadingLine } from "$lib/Pattern"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import { onMount } from "svelte"
  import sprachy from "$lib/sprachy"

  export let line: ReadingLine
  export let flip: boolean = false
  export let speakable: boolean = false
  const spa = sprachy.expectSPA()
  const { user } = spa

  onMount(() => {
    if (speakable && $user.enableSpeechSynthesis) {
      spa.speech.speak(line)
    }
  })
</script>

<div class="reading">
  <Message from={line.from} {flip}>
    <div
      class="message"
      class:hasTranslation={!!line.translation}
      data-tooltip={line.translation}
    >
      <Sprachdown inline source={line.message} />
    </div>
    <div slot="after">
      <!-- <div class="translation">
        <Sprachdown inline source={line.translation} />
      </div> -->
      {#if line.explanation}
        <div class="explanation">
          <Sprachdown inline source={line.explanation} />
        </div>
      {/if}
    </div>
  </Message>
</div>

<style lang="sass">
.message.hasTranslation
  :global(p)
    text-decoration: underline #ccc dotted
  
  cursor: default

.explanation
  padding-top: 0.8rem
  color: #444
  font-size: 90%
  color: #0b9bc7
</style>
