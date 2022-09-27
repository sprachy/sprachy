<script lang="ts">
  import _ from "lodash"
  import SprachyLogo from "$lib/SprachyLogo.svelte"
  import { errorsByField } from "$lib/client/clientUtil"
  import sprachy from "$lib/sprachy"
  import PageStyling from "$lib/PageStyling.svelte"
  let email: string = ""
  let loading: boolean = false
  let success: boolean = false
  let errors: Record<string, string> = {}

  async function sendPasswordResetEmail() {
    const { api } = sprachy.expectBrowser()

    loading = true
    try {
      await api.sendPasswordResetEmail(email)
      success = true
    } catch (err: any) {
      if (err?.response?.status == 422) {
        errors = errorsByField(err.response.data.errors)
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
  <form on:submit|preventDefault={sendPasswordResetEmail}>
    <div class="form-header">
      <a href="/" class="header-logo">
        <SprachyLogo />
      </a>
    </div>

    <h1>Reset your password</h1>

    <fieldset class="form-group">
      <label for="email">Email address</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        bind:value={email}
        name="email"
        id="email"
        type="email"
        class:form-control={true}
        class:is-invalid={!!errors.email}
        placeholder="Email"
        required
        autofocus
      />
      {#if errors.email}
        <div class="invalid-feedback">
          {errors.email}
        </div>
      {/if}
      {#if success}
        <div class="text-success mt-2">
          If a user exists with that address, we'll send a password reset email.
        </div>
      {/if}
    </fieldset>

    <button class="btn btn-sprachy" type="submit" disabled={loading}
      >Send password reset email</button
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
