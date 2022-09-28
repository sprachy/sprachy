<script lang="ts">
  import sprachy from "$lib/sprachy"
  import _ from "lodash"
  import { errorsByField } from "$lib/client/clientUtil"
  import SprachyLogo from "$lib/SprachyLogo.svelte"
  import PageStyling from "$lib/PageStyling.svelte"
  import { page } from "$app/stores"

  const token = $page.url.searchParams.get("token") || ""

  let newPassword: string = ""
  let confirmPassword: string = ""
  let loading: boolean = false
  let success: boolean = false
  let errors: Record<string, string> = {}

  async function confirmResetPassword() {
    const { api } = sprachy.expectBrowser()

    loading = true
    try {
      await api.confirmPasswordReset({
        token,
        newPassword,
        confirmPassword,
      })
      success = true
    } catch (err: any) {
      if (err?.response?.status === 422) {
        errors = errorsByField(err.response.data.errors)
      } else if (err?.response?.status === 401) {
        errors.confirmPassword = "Invalid or expired token"
      } else {
        throw err
      }
    } finally {
      loading = false
    }
  }
</script>

<PageStyling hideHeader />

<main>
  <form on:submit|preventDefault={confirmResetPassword}>
    <div class="form-header">
      <a href="/" class="header-logo">
        <SprachyLogo />
      </a>
    </div>

    <h1>Confirm password reset</h1>
    <fieldset class="form-group">
      <label for="newPassword">Password</label>
      <input
        bind:value={newPassword}
        name="newPassword"
        id="newPassword"
        type="password"
        class:form-control={true}
        class:is-invalid={!!errors.newPassword}
        placeholder="New Password"
        minLength="10"
        required
      />
      {#if errors.newPassword}
        <div class="invalid-feedback">
          {errors.newPassword}
        </div>
      {/if}
    </fieldset>
    <fieldset class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        bind:value={confirmPassword}
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        class:form-control={true}
        class:is-invalid={!!errors.confirmPassword}
        placeholder="Confirm Password"
        minLength="10"
        required
      />
      {#if errors.confirmPassword}
        <div class="invalid-feedback">
          {errors.confirmPassword}
        </div>
      {/if}
    </fieldset>

    {#if success}
      <div class="text-success">
        Password reset successfully. You can now <a
          data-sveltekit-prefetch
          href="/login">log in</a
        >.
      </div>
    {/if}

    <button class="btn btn-sprachy" type="submit" disabled={loading}
      >Change password</button
    >
  </form>
</main>

<style>
  main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    width: 340px;
    padding-left: 16px;
    padding-right: 16px;
    margin: auto;

    position: relative;
    top: -2rem;
  }

  form .form-header {
    text-align: center;
    margin-bottom: 1rem;
  }

  form h1 {
    font-size: 28px;
    text-align: center;
  }

  form fieldset {
    margin-top: 1rem;
  }

  form button {
    margin-top: 1rem;
    width: 100%;
  }
</style>
