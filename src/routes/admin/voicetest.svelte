<script lang="ts">
  import _ from "lodash"
  import { onMount } from "svelte"
  import type { User } from "$lib/api"
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import { sprachdex } from "$lib/sprachdex"
  import Avatar from "$lib/Avatar.svelte"

  let users: User[] = []

  const spa = sprachy.expectSPA()

  let selectedCharacterId = "narrator"
  let text = ""

  $: selectedCharacter = sprachdex.getCharacter(selectedCharacterId)

  async function speak() {
    spa.speech.characterSpeak(selectedCharacter, text)
  }
</script>

<SiteLayout>
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
    <button class="btn btn-primary">Speak</button>
  </form>
</SiteLayout>

<style>
  :global(img) {
    margin-top: calc(4px - 0.125rem);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
</style>
