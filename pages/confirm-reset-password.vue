<script setup lang="ts">
definePageMeta({
  layout: false
})

const token = useRoute().query['token'] as string

const state = defineState({
  newPassword: "",
  confirmPassword: "",
  loading: false,
  success: false,
  errors: {} as Record<string, string>,
})

async function confirmResetPassword() {
  state.loading = true
  try {
    await api.confirmPasswordReset({
      token,
      newPassword: state.newPassword,
      confirmPassword: state.confirmPassword,
    })
    state.success = true
  } catch (err) {
    if (err instanceof FetchError) {
      state.errors.confirmPassword = err.data.message
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
    <form @submit.prevent="confirmResetPassword">
      <div class="form-header">
        <a href="/" class="header-logo">
          <SprachyLogo />
        </a>
      </div>

      <h1>Confirm password reset</h1>
      <fieldset class="form-group">
        <label for="newPassword">Password</label>
        <input v-model="state.newPassword" name="newPassword" id="newPassword" type="password"
          :class="{ 'form-control': true, 'is-invalid': !!state.errors.newPassword }" placeholder="New Password"
          minLength="10" required />
        <div v-if="state.errors.newPassword" class="invalid-feedback">
          {{ state.errors.newPassword }}
        </div>
      </fieldset>
      <fieldset class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input v-model="state.confirmPassword" name="confirmPassword" id="confirmPassword" type="password"
          :class="{ 'form-control': true, 'is-invalid': !!state.errors.confirmPassword }" placeholder="Confirm Password"
          minLength="10" required />
        <div v-if="state.errors.confirmPassword" class="invalid-feedback">
          {{ state.errors.confirmPassword }}
        </div>
      </fieldset>

      <div v-if="state.success" class="text-success">
        Password reset successfully. You can now <NuxtLink href="/login">log in</NuxtLink>.
      </div>

      <button class="btn btn-sprachy" type="submit" :disabled="state.loading">Change password</button>
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
