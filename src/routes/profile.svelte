<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import _ from "lodash"
  import { onMount } from "svelte"
  const spa = sprachy.expectSPA()
  const { api, user } = spa

  let name = $user.name
  let bio = $user.bio
  let pfp: File[]
  let canvas

  let errors: Record<string, string> = {}

  async function editName() {
    errors = {}
    try {
      $user = await api.patchProfile(name, "name")
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
        bind:this={canvas}
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
      disabled={name === $user.name}
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
      disabled={bio === $user.bio}
      on:click|preventDefault={editBio}>Save Profile Bio</button
    >
  </form>
</SiteLayout>
