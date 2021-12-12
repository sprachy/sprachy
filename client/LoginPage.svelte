<script lang="ts">
  import { navigate } from "svelte-navigator"
  import sprachy from "./sprachy"

  let email: string = ""
  let password: string = ""
  let errorMessage: string | null = null

  async function login() {
    errorMessage = null

    try {
      const userSummary = await sprachy.api.signIn({ email, password })
      sprachy.initApp(userSummary)
      navigate("/home")
    } catch (err: any) {
      if (err?.response?.data?.code === "authentication failed") {
        errorMessage = "Invalid email or password"
      } else {
        throw err
      }
    }
  }
</script>

<template>
  <main class="container">
    <form class="form" on:submit|preventDefault={login}>
      <fieldset class="form-group">
        <label for="emailInput">Email</label>
        <input
          name="email"
          id="emailInput"
          placeholder="Email"
          class="form-control"
          required
          bind:value={email}
        />
      </fieldset>
      <fieldset class="form-group mt-2">
        <label for="passwordInput">Email</label>
        <input
          name="password"
          id="passwordInput"
          type="password"
          placeholder="Password"
          class="form-control"
          required
          bind:value={password}
        />
      </fieldset>
      <button class="btn btn-primary mt-2" type="submit">Sign in</button>
      {#if errorMessage}
        <div>
          {errorMessage}
        </div>
      {/if}
      <hr />
      <a href="/">Sign up</a>
    </form>
  </main>
</template>

<style lang="sass">
main
  height: calc(100vh - 5rem)
  display: flex
  align-items: center
  justify-content: center
</style>
