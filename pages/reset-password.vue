<script setup lang="ts">
definePageMeta({
  layout: false
})

const state = defineState({
  email: "",
  loading: false,
  success: false,
  errors: {} as Record<string, string>
})

async function sendPasswordResetEmail() {
  state.loading = true

  try {
    await api.sendPasswordResetEmail({ email: state.email })
    state.success = true
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
    <form @submit.prevent="sendPasswordResetEmail">
      <div class="form-header">
        <a href="/" class="header-logo">
          <SprachyLogo />
        </a>
      </div>

      <h1>Reset your password</h1>

      <fieldset class="form-group">
        <label for="email">Email address</label>
        <input v-model="state.email" name="email" id="email" type="email"
          :class="{ 'form-control': true, 'is-invalid': !!state.errors.email }" placeholder="Email" required autofocus />
        <div v-if="state.errors.email" class="invalid-feedback">
          {{ state.errors.email }}
        </div>
        <div v-if="state.success" class="text-success mt-2">
          If a user exists with that address, we'll send a password reset email.
        </div>
      </fieldset>

      <button class="btn btn-sprachy" type="submit" :disabled="state.loading">Send password reset email</button>
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

form button {
  margin-top: 1rem;
  width: 100%;
}
</style>
