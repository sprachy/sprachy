<script lang="ts">
  import sprachy from "$lib/sprachy"
  import _ from "lodash"
  import { goto } from "$app/navigation"
  const spa = sprachy.expectSPA()
  const { api, user } = spa

  let displayName: string = ""

  async function makeProfile() {
    $user = await api.makeProfile({ displayName })
    goto(`/user/${$user.username}`)
  }
</script>

<main class="container">
  <div class="card">
    <div class="card-header">
      <h4 class="m-0">Make a Profile</h4>
    </div>
    <div class="card-body">
      <form class="inputForm" on:submit|preventDefault={makeProfile}>
        <fieldset class="form-group">
          <label for="name">Display Name</label>
          <input
            bind:value={displayName}
            name="displayName"
            id="displayName"
            type="displayName"
            class:form-control={true}
            placeholder="Display Name"
            required
          />
        </fieldset>
        <button type="submit" class="btn btn-primary mt-3">Make Profile</button>
      </form>
    </div>
  </div>
</main>

<style>
  .card {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    max-width: 600px;
    margin: auto;
  }
</style>
