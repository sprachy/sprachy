<script lang="ts">
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import Modal from "./Modal.svelte"
  import sprachy from "./sprachy"
  import { errorsByField, otherResponse } from "./utils"

  export let onDismiss: () => void
  export let email: string = ""
  export let password: string = ""

  let loading: boolean = false
  let errors: Record<string, string> = {}

  let signupEmail: string = email
  let signupPassword: string = password
  let confirmPassword: string = password

  async function signup() {
    errors = {}
    if (password != confirmPassword) {
      errors.confirmPassword = "This doesn't match the password"
      return
    }

    loading = true
    const res = await sprachy.api.signUp({
      email: signupEmail,
      password: signupPassword,
      confirmPassword,
    })
    loading = false

    if (res.status === 200) {
      onDismiss()
      sprachy.initApp(res.summary)
      if (window.location.search.length > 0) {
        navigate(window.location.search.substring(6))
      } else {
        navigate("/home")
      }
    } else {
      if (res.code === "user already exists") {
        errors.email = "This email is already registered"
      } else if (res.code === "validation failed") {
        errors = errorsByField(res.errors)
      } else {
        otherResponse(res)
      }
    }
  }
</script>

<Modal open={true} on:closed={onDismiss}>
  <form on:submit|preventDefault={signup}>
    <div class="modal-header">
      Create your account
      <button type="button" aria-label="Close" class="close" on:click={onDismiss}> × </button>
    </div>
    <div class="modal-body">
      <fieldset class="form-group">
        <label for="email">Email</label>
        <input
          bind:value={signupEmail}
          name="email"
          id="email"
          type="email"
          class:form-control={true}
          class:is-invalid={!!errors.email}
          placeholder="Email"
          required
        />
        {#if errors.email}
          <div class="invalid-feedback">
            {errors.email}
          </div>
        {/if}
      </fieldset>
      <fieldset class="form-group">
        <label for="password">Password</label>
        <input
          bind:value={signupPassword}
          name="password"
          id="password"
          type="password"
          class:form-control={true}
          class:is-invalid={!!errors.password}
          placeholder="Password"
          minLength="10"
          required
        />
        {#if errors.password}
          <div class="invalid-feedback">
            {errors.password}
          </div>
        {/if}
      </fieldset>
      <fieldset class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input
          bind:value={confirmPassword}
          name="confirm_password"
          id="confirm_password"
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
      <button class="btn btn-lg text-white" type="submit">Enter Sprachy</button>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-sprachy" disabled={loading}>Sign up</button>
    </div>
  </form>
</Modal>

<style lang="sass">

</style>
