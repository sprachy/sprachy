<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import _ from "lodash"
  const spa = sprachy.expectSPA()
  const { api, user } = spa
  async function goToSettings() {
    location.href = "/profile-settings"
  }
</script>

<SiteLayout>
  <div class="profile">
    <h2>Your Profile</h2>
    <div class="container element">
      <div class="row align-items-center">
        <div class="col-sm">
          {#if $user.pfp}
            <img src={$user.pfp} alt={$user.name} class="avatar" />
          {:else}
            <img
              src="src/lib/img/squirrel.webp"
              alt={$user.name}
              class="avatar"
            />
          {/if}
        </div>
        <div class="col-sm"><div class="username">{$user.name}</div></div>
      </div>
    </div>
    <div class="element">
      {#if $user.bio}
        {$user.bio}
      {/if}
    </div>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      on:click|preventDefault={goToSettings}>Edit Profile</button
    >
  </div>
</SiteLayout>

<style lang="sass">
  .profile
    margin: auto
    max-width: 600px
    text-align: center

  .avatar
    vertical-align: top
    width: 100px
    height: 100px
    border-radius: 50%

  .username
    font-size: 2rem

  .element
    margin-top: 2rem
    margin-bottom: 2rem
</style>
