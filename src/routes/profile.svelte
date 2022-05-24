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
    <h2 class="header">Your Profile</h2>
    <div class="profile shadow">
      <div class="card">
        <div class="card-header">
          <div class="container">
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
        </div>
        <div class="card-body">
          <div class="bio">
            {#if $user.bio}
              {$user.bio}
            {/if}
          </div>
        </div>
        <div class="card-footer text-muted">
          <button
            type="submit"
            class="btn btn-primary mt-2"
            on:click|preventDefault={goToSettings}>Edit Profile</button
          >
        </div>
      </div>
    </div>
  </div>
</SiteLayout>

<style>
  .header {
    margin-bottom: 2rem;
  }

  .profile {
    margin: auto;
    max-width: 600px;
    text-align: center;
  }

  .avatar {
    vertical-align: top;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .username {
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .bio {
    text-align: justify;
    color: #802424;
  }
</style>
