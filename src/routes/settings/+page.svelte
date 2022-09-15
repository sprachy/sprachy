<script lang="ts">
  import sprachy from "$lib/sprachy"
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

  async function resetProgress() {
    if (confirm("Are you sure you want to lose ALL Sprachy progress?")) {
      await reallyResetProgress()
    }
  }

  async function reallyResetProgress() {
    await spa.reallyResetAllUserProgress()
  }
</script>

<main class="container">
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

      <div class="text-secondary">
        Sprachy will never send you marketing emails, just opt-in notifications.
      </div>
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
      Enable speech synthesis

      <div class="text-secondary">
        Not always accurate to how humans would speak German. It's decent
        though, and we find audio improves the learning process a lot.
      </div>
    </label>
  </div>
  <section class="danger-zone">
    <h2 id="danger-zone">Danger Zone</h2>
    <div class="box">
      <ul>
        <li>
          <div>
            <strong>Reset progress</strong>
            <div>Resets all progress to start again from zero</div>
          </div>
          <button class="btn btn-danger" on:click={resetProgress}
            >Reset progress</button
          >
        </li>
      </ul>
    </div>
  </section>
</main>

<style>
  section {
    margin-top: 2rem;
  }

  h2 {
    font-size: 24px;
    font-weight: 400;
  }

  .danger-zone .box {
    border: 1px solid red;
    border-radius: 6px;
  }

  .danger-zone ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .danger-zone li {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
