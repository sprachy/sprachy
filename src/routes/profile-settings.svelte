<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import _ from "lodash"
  const spa = sprachy.expectSPA()
  const { api, user } = spa

  let username = $user.username
  let displayName = $user.displayName
  let bio = $user.bio
  let pfp: File[]

  let errors: Record<string, string> = {}

  async function editDisplayName() {
    errors = {}
    try {
      $user = await api.patchProfile(displayName, "displayName")
    } catch (err: any) {
      throw err
    }
  }

  async function editUsername() {
    errors = {}
    try {
      if (username) {
        $user = await api.patchProfile(username, "username")
      }
    } catch (err: any) {
      throw err
    }
  }

  async function editBio() {
    errors = {}
    try {
      $user = await api.patchProfile(bio, "bio")
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
        reader.onload = async function (readerEvent) {
          if (typeof reader.result == "string") {
            const image = new Image()
            image.onload = async function (imageEvent) {
              var canvas = document.createElement("canvas"),
                max_size = 624,
                width = image.width,
                height = image.height

              canvas.width = width
              canvas.height = height
              const aspectRatio = width / height
              let newWidth = width
              let newHeight = height
              if (aspectRatio > 1) {
                newWidth = height
              } else if (aspectRatio < 1) {
                newHeight = width
              }

              if (newWidth > newHeight) {
                if (newWidth > max_size) {
                  newHeight *= max_size / newWidth
                  newWidth = max_size
                }
              } else {
                if (newHeight > max_size) {
                  newWidth *= max_size / newHeight
                  newHeight = max_size
                }
              }

              const newX = (newWidth - width) * 0.5
              const newY = (newHeight - height) * 0.5
              canvas.width = newWidth
              canvas.height = newHeight
              const newImage = canvas.getContext("2d")
              newImage!.drawImage(image, newX, newY)

              var dataUrl = canvas.toDataURL("image/jpeg")
              $user = await api.patchProfile(dataUrl, "pfp")
            }
            // @ts-ignore
            image.src = readerEvent.target!.result
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
  <form class="inputForm">
    <fieldset class="form-group col-md-6">
      <label for="username">Username</label>
      <input
        bind:value={username}
        name="username"
        id="username"
        type="username"
        class:form-control={true}
        class:is-invalid={!!errors.displayName}
        placeholder="Username"
        required
      />
      {#if errors.username}
        <div class="invalid-feedback">
          {errors.username}
        </div>
      {/if}
    </fieldset>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      disabled={username === $user.username}
      on:click|preventDefault={editUsername}>Change Username</button
    >
  </form>
  <form class="inputForm">
    <fieldset class="form-group col-md-6">
      <label for="name">Display Name</label>
      <input
        bind:value={displayName}
        name="displayName"
        id="displayName"
        type="displayName"
        class:form-control={true}
        class:is-invalid={!!errors.displayName}
        placeholder="Display Name"
        required
      />
      {#if errors.displayName}
        <div class="invalid-feedback">
          {errors.displayName}
        </div>
      {/if}
    </fieldset>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      disabled={displayName === $user.displayName}
      on:click|preventDefault={editDisplayName}>Change Display Name</button
    >
  </form>
  <form class="inputForm">
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
      {#if errors.bio}
        <div class="invalid-feedback">
          {errors.bio}
        </div>
      {/if}
    </fieldset>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      disabled={bio === $user.bio}
      on:click|preventDefault={editBio}>Save Profile Bio</button
    >
  </form>
</SiteLayout>

<style>
  .inputForm {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
