<script lang="ts">
  import _ from "lodash"
  import { sprachdex } from "$lib/sprachdex"
  import Sprachdown from "./Sprachdown.svelte"
  import { browser } from "$app/env"
  import { onDestroy, onMount } from "svelte"

  export let charId: string
  $: character = sprachdex.getCharacter(charId)

  let showProfile: boolean = false

  let avatarEl: HTMLElement

  function onClickElsewhere(ev: MouseEvent) {
    // Hide profile popover if you click outside it
    if (ev.target instanceof Element && !avatarEl.contains(ev.target)) {
      showProfile = false
    }
  }

  function toggleProfile() {
    showProfile = !showProfile
  }

  if (browser) {
    onMount(() => {
      window.addEventListener("click", onClickElsewhere)
    })

    onDestroy(() => {
      window.removeEventListener("click", onClickElsewhere)
    })
  }
</script>

<div class="avatar" bind:this={avatarEl}>
  <img
    src={character.avatar}
    alt={character.fullname}
    on:click={toggleProfile}
  />
  {#if showProfile}
    <div class="profile">
      <div class="card">
        <div class="card-header">
          <img src={character.avatar} alt={character.fullname} />
          {character.fullname}
        </div>
        <div class="card-body">
          <Sprachdown source={character.profile} />
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="sass">
.avatar
  position: relative

  img
    cursor: pointer

.profile
  z-index: 1006
  position: absolute
  left: 80%
  top: 0
  width: 350px

  img
    width: 50px
    height: 50px

  // :global(p)
  //   font-size: 1rem
  //   line-height: 1.8rem

</style>
