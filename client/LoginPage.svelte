<script lang="ts">
  import sprachy from "./sprachy"
  import _ from "lodash"
  import { navigate } from "svelte-navigator"
  import { onMount } from "svelte"
  import { errorsByField } from "./utils"
  let email: string = ""
  let password: string = ""
  let loading: boolean = false
  let errors: Record<string, string> = {}

  onMount(() => {
    if (sprachy.user) {
      navigate("/home")
    }
  })

  async function login() {
    loading = true
    errors = {}
    const res = await sprachy.api.login({ email, password })
    loading = false

    if (res.status === 200) {
      sprachy.initApp(res.summary)
      const params = new URLSearchParams(window.location.search)
      const afterLoginUrl = params.get("next")
      if (afterLoginUrl) {
        navigate(afterLoginUrl)
      } else {
        navigate("/home")
      }
    } else {
      if (res.code === "wrong password") {
        errors.password = "The password doesn't match the user"
      } else if (res.code === "validation failed") {
        errors = errorsByField(res.errors)
      }
    }
  }
</script>

<main>
  <form on:submit|preventDefault={login}>
    <h1>Sign in to Sprachy</h1>
    <fieldset class="form-group">
      <label for="email">Email address</label>
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
      {#if errors.email}
        <div class="invalid-feedback">
          {errors.email}
        </div>
      {/if}
    </fieldset>
    <fieldset class="form-group">
      <label for="password">Password</label>
      <input
        bind:value={password}
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
    <div>
      <a href="/forgot-password">Forgot password?</a>
    </div>

    <button class="btn btn-sprachy" type="submit" disabled={loading}>Sign in</button>

    <p class="signup-callout">
      New to Sprachy? <a href="/signup">Create an account</a>.
    </p>
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

  h1
    font-size: 28px

  fieldset
    margin-top: 1rem
  
  button
    margin-top: 1rem

  .signup-callout
    margin-top: 1rem
    padding: 15px 20px
    text-align: center
    border: 1px solid #ccc
    border-radius: 6px
</style>
