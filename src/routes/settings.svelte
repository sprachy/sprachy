<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  const spa = sprachy.expectSPA()
  const { api, user } = spa

  let email = $user.email
  let wantsReminderEmails = $user.wantsReminderEmails
  let enableSpeechSynthesis = $user.enableSpeechSynthesis

  let errors: Record<string, string> = {}
  let confirmChangeAddress: string | null = null
  let emailChangeConfirmed: boolean = false

  const params = new URLSearchParams(window.location.search)
  const emailConfirmToken = params.get("emailConfirmToken")
  if (emailConfirmToken) {
    confirmEmailChange(emailConfirmToken)
  }

  async function confirmEmailChange(token: string) {
    try {
      const { newEmail } = await api.confirmEmailChange(token)
      $user.email = newEmail
      email = newEmail
      emailChangeConfirmed = true
    } catch (err: any) {
      if (err?.response?.status === 400) {
        errors.email = err.response.data
      } else {
        throw err
      }
    }
  }

  async function submitEmailChange() {
    errors = {}
    try {
      await api.changeEmail(email)
      confirmChangeAddress = email
    } catch (err: any) {
      if (err?.response?.status === 409) {
        errors.email = "Another user already has this email!"
      } else {
        throw err
      }
    }
  }

  async function toggleReminderEmails() {
    $user = await api.patchSettings({
      wantsReminderEmails: !$user.wantsReminderEmails,
    })
    wantsReminderEmails = $user.wantsReminderEmails
  }

  async function toggleSpeechSynthesis() {
    $user = await api.patchSettings({
      enableSpeechSynthesis: !$user.enableSpeechSynthesis,
    })
    enableSpeechSynthesis = $user.enableSpeechSynthesis
  }
</script>

<SiteLayout>
  <h1>Account Settings</h1>

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
          Confirmation email sent to {confirmChangeAddress}. Please click the
          link in the email to confirm the change.
        </div>
      {/if}
      {#if emailChangeConfirmed}
        <div class="text-success">Email changed successfully.</div>
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
      disabled={email === $user.email}
      on:click|preventDefault={submitEmailChange}>Change Email</button
    >
  </form>
  <div class="form-check mt-2">
    <input
      class="form-check-input"
      type="checkbox"
      checked={wantsReminderEmails}
      id="wantsReminderEmails"
      on:change|preventDefault={toggleReminderEmails}
    />
    <label class="form-check-label" for="wantsReminderEmails">
      Send me a reminder email when patterns are ready to review
    </label>
  </div>
  <div class="form-check mt-2">
    <input
      class="form-check-input"
      type="checkbox"
      checked={enableSpeechSynthesis}
      id="enableSpeechSynthesis"
      on:change|preventDefault={toggleSpeechSynthesis}
    />
    <label class="form-check-label" for="enableSpeechSynthesis">
      <span class="text-info">Experimental:</span> Enable speech synthesis for
      stories

      <div class="text-secondary">
        The pronunciation will not always be accurate to how humans would speak
        German.
      </div>
    </label>
  </div>
</SiteLayout>
