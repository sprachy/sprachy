<script setup lang="ts">
definePageMeta({
  layout: false
})

// import sprachy from "~/lib/sprachy"
// import _ from "lodash"
// import SprachyLogo from "~/lib/SprachyLogo.svelte"
// import PageStyling from "~/lib/PageStyling.svelte"
// import { prefetchRoutes } from "$app/navigation"
// import { errorsByField } from "~/lib/client/clientUtil"
// import type { PageData } from "./$types"

const next = useRoute().params.next
const state = defineState({
  email: "",
  password: "",
  loading: false,
  errors: {} as any
})

async function login() {
  state.loading = true
  state.errors = {}
  try {
    const { summary } = await api.login({
      email: state.email,
      password: state.password
    })

    await initSPA(summary)

    const router = useRouter()
    if (next) {
      router.push(next as string)
    } else {
      router.push("/learn")
    }
  } catch (err) {
    if (err instanceof FetchError) {
      state.errors.other = err.data.message
    } else {
      throw err
    }
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="login">
      <div class="form-header">
        <a href="/" class="header-logo">
          <SprachyLogo />
        </a>
      </div>

      <h1>Sign in to Sprachy</h1>
      <fieldset class="form-group">
        <label for="email">Email address</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input v-model="state.email" name="email" id="email" type="email"
          :class="{ 'form-control': true, 'is-invalid': !!state.errors.email }" placeholder="Email" required autofocus />
        <div v-if="state.errors.email" class="invalid-feedback">
          {{ state.errors.email }}
        </div>
      </fieldset>
      <fieldset class="form-group">
        <label for="password">Password</label>
        <input v-model="state.password" name="password" id="password" type="password"
          :class="{ 'form-control': true, 'is-invalid': !!state.errors.password }" placeholder="Password" minLength="10"
          required />

        <div v-if="state.errors.password" class="invalid-feedback">
          {{ state.errors.password }}
        </div>
      </fieldset>
      <div class="forgot-password">
        <NuxtLink href="/reset-password">Forgot password?</NuxtLink>
      </div>

      <div v-if="state.errors.other" class="text-danger">
        {{ state.errors.other }}
      </div>

      <button class="btn btn-sprachy" type="submit" :disabled="state.loading">Sign in</button>

      <p class="signup-callout">
        New to Sprachy?
        <NuxtLink :href="next ? `/signup?next=${next}` : '/signup'">Create an account</NuxtLink>.
      </p>
    </form>
  </main>
</template>

<style scoped>
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

form .forgot-password {
  font-size: 90%;
  margin-top: 0.2rem;
}

form button {
  margin-top: 1rem;
  width: 100%;
}

form .signup-callout {
  margin-top: 1rem;
  padding: 15px 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
