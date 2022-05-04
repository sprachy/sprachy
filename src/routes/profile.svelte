<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import _ from "lodash"
  const { spa, api } = sprachy.expectSPA()

  let name = spa.user.name
  let bio = spa.user.bio
  let pfp: File[]

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

  async function uploadPfp(ev: Event) {
    errors = {}
    try {
      const el = ev.target as HTMLInputElement
      const pfp = el.files![0]
      if (pfp) {
        var reader = new FileReader()
        reader.onloadend = function () {
          if (typeof reader.result == "string") {
            api.patchProfile(reader.result, "pfp")
          }
        }
        reader.readAsDataURL(pfp)
      }
    } catch (err: any) {
      throw err
    }
  }
</script>

<SiteLayout>
  <h1>Profile Settings</h1>
  <form>
    <fieldset class="mb-3 col-md-6">
      <label for="pfp">Profile Picture</label>
      <input
        bind:value={pfp}
        name="pfp"
        id="pfp"
        type="file"
        class:form-control={true}
        class:is-invalid={!!errors.pfp}
        placeholder="Profile Picture"
        accept="image/png, image/jpeg, image/webp"
        on:change={uploadPfp}
      />
      {#if errors.pfp}
        <div class="invalid-feedback">
          {errors.pfp}
        </div>
      {/if}
    </fieldset>
  </form>
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
