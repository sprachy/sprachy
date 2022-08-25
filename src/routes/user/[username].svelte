<script lang="ts">
  import sprachy from "$lib/sprachy"
  import _ from "lodash"
  import type { User } from "$lib/api"
  import defaultProfileImage from "$lib/img/squirrel.webp"
  export let profileUser: User

  const { user } = sprachy.spa ?? {}
  // do stuff with this variable maybe
  const viewingOwnProfile = profileUser.id === $user?.id

  async function goToSettings() {
    location.href = "/profile-settings"
  }
</script>

<main class="container">
  <div class="profile">
    <h2 class="header">{profileUser.displayName}'s profile</h2>
    <div class="profile shadow">
      <div class="card">
        <div class="card-header">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-sm">
                {#if profileUser.pfp}
                  <img
                    src={profileUser.pfp}
                    alt={profileUser.displayName}
                    class="avatar"
                  />
                {:else}
                  <img
                    src={defaultProfileImage}
                    alt={profileUser.displayName}
                    class="avatar"
                  />
                {/if}
              </div>
              <div class="col-sm">
                <div class="displayName">{profileUser.displayName}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="bio">
            {#if profileUser.bio}
              {profileUser.bio}
            {/if}
          </div>
        </div>
        <div class="card-footer text-muted">
          {#if viewingOwnProfile}
            <button
              type="submit"
              class="btn btn-primary mt-2"
              on:click|preventDefault={goToSettings}>Edit Profile</button
            >
          {/if}
        </div>
      </div>
    </div>
  </div>
</main>

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
  .displayName {
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .bio {
    text-align: justify;
    color: #802424;
  }
</style>
