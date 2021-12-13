<script lang="ts">
  import _ from "lodash"
  import lukas from "./img/lukas.png"
  import anna from "./img/anna.png"
  import squirrel from "./img/squirrel.png"
  import scientist from "./img/scientist.png"
  import deer from "./img/deer.png"
  import { sprachdex } from "../common/sprachdex"
  import Sprachdown from "./Sprachdown.svelte"

  export let charId: string
  $: icon = { lukas, anna, squirrel, scientist, deer }[charId]

  $: character = sprachdex.getCharacter(charId)

  let showProfile: boolean = false

  function toggleProfile() {
    showProfile = !showProfile
  }
</script>

<div class="avatar">
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
