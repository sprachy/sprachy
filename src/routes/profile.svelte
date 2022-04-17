<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  const { spa, api } = sprachy.expectSPA()

  let name = spa.user.name

  let errors: Record<string, string> = {}

  async function editName() {
    errors = {}
    try {
      spa.user = await api.changeProfileName(name)
    } catch (err: any) {
      throw err
    }
  }

  const params = new URLSearchParams(window.location.search)
</script>

<SiteLayout>
  <h1>Profile Settings</h1>
  <form>
    <fieldset class="form-group">
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
</SiteLayout>
