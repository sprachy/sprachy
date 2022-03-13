<script lang="ts">
  import sprachy from "./sprachy"
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import { onMount } from "svelte"
  import { errorsByField } from "./utils"
  import SprachyLogo from "./SprachyLogo.svelte"
  let email: string = ""
  let loading: boolean = false
  let success: boolean = false
  let errors: Record<string, string> = {}

  onMount(() => {
    if (sprachy.user) {
      navigate("/home")
    }
  })

  async function sendPasswordResetEmail() {
    loading = true
    try {
      const res = await sprachy.api.sendPasswordResetEmail(email)
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

<style lang="sass">
main
  height: 100%
  display: flex
  align-items: center
  justify-content: center

form
  width: 340px
  padding-left: 16px
  padding-right: 16px
  margin: auto

  position: relative
  top: -2rem

  .form-header
    text-align: center
    margin-bottom: 1rem

  h1
    font-size: 28px
    text-align: center

  fieldset
    margin-top: 1rem

  button
    margin-top: 1rem
    width: 100%
</style>
