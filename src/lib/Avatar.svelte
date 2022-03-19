<script lang="ts">
  import _ from "lodash"
  import lukas from "$lib/img/lukas.png"
  import anna from "$lib/img/anna.png"
  import squirrel from "$lib/img/squirrel.png"
  import lindenbaum from "$lib/img/scientist.png"
  import deer from "$lib/img/deer.png"
  import cashier from "$lib/img/cashier.png"
  import mirror from "$lib/img/mirror.png"
  import explorer from "$lib/img/explorer.png"
  import robot from "$lib/img/robot.png"
  import reporter from "$lib/img/reporter.png"
  import fish from "$lib/img/fish.png"
  import dog from "$lib/img/dog.png"
  import leonie from "$lib/img/leonie.png"
  import nils from "$lib/img/nils.png"
  import fox from "$lib/img/fox.png"
  import harald from "$lib/img/harald.png"
  import klaus from "$lib/img/klaus.png"
  import { sprachdex } from "$lib/sprachdex"
  import Sprachdown from "./Sprachdown.svelte"
  import { browser } from "$app/env"
  import { onDestroy, onMount } from "svelte"

  export let charId: string
  $: icon = {
    lukas,
    anna,
    squirrel,
    lindenbaum,
    deer,
    cashier,
    mirror,
    explorer,
    robot,
    reporter,
    fish,
    dog,
    leonie,
    nils,
    fox,
    harald,
    klaus,
  }[charId]

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
  <img src={icon} alt={character.fullname} on:click={toggleProfile} />
  {#if showProfile}
    <div class="profile">
      <div class="card">
        <div class="card-header">
          <img src={icon} alt={character.fullname} />
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
