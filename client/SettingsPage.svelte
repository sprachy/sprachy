<script lang="ts">
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"

  const { user } = sprachy.app
  let email = user.email

  async function submitEmailChange() {
    await sprachy.api.changeEmail(email)
  }
</script>

<SiteLayout>
  <h1>Settings</h1>

  <form>
    <fieldset class="form-group">
      <label for="email">Email</label>
      <input
        bind:value={email}
        name="email"
        id="email"
        type="email"
        class:form-control={true}
        placeholder="Email"
        required
      />
    </fieldset>
    <button
      type="submit"
      class="btn btn-primary"
      disabled={email === user.email}
      on:click={submitEmailChange}>Change Email</button
    >
  </form>
</SiteLayout>
