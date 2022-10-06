<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import { sprachdex } from "$lib/sprachdex"
  import Avatar from "$lib/Avatar.svelte"
  import type { ReadingLine } from "$lib/Pattern"
  import StoryLineReading from "$lib/client/StoryLineReading.svelte"

  const spa = sprachy.expectSPA()

  let selectedCharacterId = "squirrel"
  let text = ""

  $: lines = (($selectedCharacterId) => {
    const lines: ReadingLine[] = []
    for (const pattern of sprachdex.patternsIncludingDrafts) {
      for (const line of pattern.story) {
        if (line.type === "reading" && line.from === $selectedCharacterId) {
          lines.push(line)
        }
      }
    }
    return lines
  })(selectedCharacterId)

  $: for (const line of lines) {
    const { from, message } = line
    if (message) spa.speech.preload({ from, message })
  }

  async function speak() {
    const audio = await spa.speech.synthesizeFromCharacter(
      selectedCharacterId,
      text
    )
    spa.speech.playAudioContent(audio)
  }
</script>

<main class="voicetest">
  <h1>Voice Tester</h1>
  <form on:submit|preventDefault={speak}>
    <div class="mb-3">
      <select class="form-select" bind:value={selectedCharacterId}>
        {#each sprachdex.characters as character}
          <option value={character.id}>
            {character.id}
          </option>
        {/each}
      </select>
    </div>
    <div class="mb-3 d-flex align-items-center">
      <Avatar charId={selectedCharacterId} />
      <div class="flex-grow-1">
        <input
          id="voicetext"
          class="form-control"
          placeholder="What to say..."
          bind:value={text}
        />
      </div>
    </div>
    <button class="btn btn-primary mb-4">Speak</button>
    {#each lines as line, i}
      <StoryLineReading staticMode {line} />
    {/each}
  </form>
</main>

<style>
  .voicetest :global(img) {
    margin-top: calc(4px - 0.125rem);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
</style>
