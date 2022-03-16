<script lang="ts">
  import _ from "lodash";
  import lukas from "./img/lukas.png";
  import anna from "./img/anna.png";
  import squirrel from "./img/squirrel.png";
  import lindenbaum from "./img/scientist.png";
  import deer from "./img/deer.png";
  import cashier from "./img/cashier.png";
  import mirror from "./img/mirror.png";
  import explorer from "./img/explorer.png";
  import robot from "./img/robot.png";
  import reporter from "./img/reporter.png";
  import fish from "./img/fish.png";
  import dog from "./img/dog.png";
  import leonie from "./img/leonie.png";
  import nils from "./img/nils.png";
  import fox from "./img/fox.png";
  import harald from "./img/harald.png";
  import klaus from "./img/klaus.png";
  import { sprachdex } from "../common/sprachdex";
  import Sprachdown from "./Sprachdown.svelte";
  import { browser } from "$app/env";
  import { onDestroy, onMount } from "svelte";

  export let charId: string;
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
  }[charId];

  $: character = sprachdex.getCharacter(charId);

  let showProfile: boolean = false;

  let avatarEl: HTMLElement;

  function onClickElsewhere(ev: MouseEvent) {
    // Hide profile popover if you click outside it
    if (ev.target instanceof Element && !avatarEl.contains(ev.target)) {
      showProfile = false;
    }
  }

  function toggleProfile() {
    showProfile = !showProfile;
  }

  if (browser) {
    onMount(() => {
      window.addEventListener("click", onClickElsewhere);
    });

    onDestroy(() => {
      window.removeEventListener("click", onClickElsewhere);
    });
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
