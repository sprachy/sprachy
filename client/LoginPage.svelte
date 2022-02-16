<script lang="ts">
  import sprachy from "./sprachy"
  import _ from "lodash"
  import { Link, navigate } from "svelte-navigator"
  import { onMount } from "svelte"
  import { errorsByField } from "./utils"
  import SprachyLogo from "./SprachyLogo.svelte"
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
    <div class="form-header">
      <a href="/" class="header-logo">
        <SprachyLogo />
      </a>
    </div>

    <h1>Sign in to Sprachy</h1>
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
    <div class="forgot-password">
      <Link to="/reset-password">Forgot password?</Link>
    </div>

    <button class="btn btn-sprachy" type="submit" disabled={loading}>Sign in</button>

    <p class="signup-callout">
      New to Sprachy? <Link to="/signup">Create an account</Link>.
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

  .forgot-password
    font-size: 90%
    margin-top: 0.2rem
  
  button
    margin-top: 1rem
    width: 100%

  .signup-callout
    margin-top: 1rem
    padding: 15px 20px
    text-align: center
    border: 1px solid #ccc
    border-radius: 6px
</style>
