<script lang="ts">
  import SiteLayout from "./SiteLayout.svelte"
  import sprachy from "./sprachy"

  const { user } = sprachy.app
  let email = user.email

  let errors: Record<string, string> = {}
  let confirmChangeAddress: string | null = null

  async function submitEmailChange() {
    errors = {}
    try {
      await sprachy.api.changeEmail(email)
      confirmChangeAddress = email
    } catch (err: any) {
      if (err?.response?.status === 409) {
        errors.email = "Another user already has this email!"
      } else {
        throw err
      }
    }
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
        class:is-invalid={!!errors.email}
        placeholder="Email"
        required
      />
      {#if confirmChangeAddress}
        <div class="text-success">
          Confirmation email sent to {confirmChangeAddress}. Please click the link in the email to
          confirm the change.
        </div>
      {/if}
      {#if errors.email}
        <div class="invalid-feedback">
          {errors.email}
        </div>
      {/if}
    </fieldset>
    <button
      type="submit"
      class="btn btn-primary mt-2"
      disabled={email === user.email}
      on:click|preventDefault={submitEmailChange}>Change Email</button
    >
  </form>
</SiteLayout>
