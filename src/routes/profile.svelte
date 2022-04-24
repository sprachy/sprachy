<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import _ from "lodash"
  const { spa, api } = sprachy.expectSPA()

  let name = spa.user.name
  let bio = spa.user.bio

  let errors: Record<string, string> = {}

  async function editName() {
    errors = {}
    try {
      spa.user = await api.patchProfile(name, "name")
    } catch (err: any) {
      throw err
    }
  }

  async function editBio() {
    errors = {}
    try {
      spa.user = await api.patchProfile(bio, "bio")
    } catch (err: any) {
      throw err
    }
  }

  const params = new URLSearchParams(window.location.search)
</script>

<SiteLayout>
  <h1>Profile Settings</h1>
  <form>
    <fieldset class="form-group col-md-6">
      <label for="name">Name</label>
      <input
        bind:value={name}
        name="name"
        id="name"
        type="name"
        class:form-control={true}
        class:is-invalid={!!errors.name}
        placeholder="Name"
        required
      />
      {#if errors.name}
        <div class="invalid-feedback">
          {errors.name}
        </div>
      {/if}
    </fieldset>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      disabled={name === spa.user.name}
      on:click|preventDefault={editName}>Change Name</button
    >
  </form>
  <form>
    <fieldset class="form-group col-md-6">
      <label for="bio">Bio</label>
      <textarea
        bind:value={bio}
        name="bio"
        id="bio"
        type="bio"
        class:form-control={true}
        class:is-invalid={!!errors.bio}
        placeholder="Profile Bio"
      />
      {#if errors.name}
        <div class="invalid-feedback">
          {errors.name}
        </div>
      {/if}
    </fieldset>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      disabled={bio === spa.user.bio}
      on:click|preventDefault={editBio}>Save Profile Bio</button
    >
  </form>
</SiteLayout>
