<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const next = route.query['next'] || ""

const state = reactive({
  email: route.query['email'] || "",
  password: "",
  confirmPassword: "",
  loading: false,
  errors: {} as Record<string, string>
})

if (process.browser) {
  onMounted(() => {
    if (state.email) {
      const el = document.getElementById("password")! as HTMLInputElement
      el.focus()
    }
  })
}

async function signup() {
  state.errors = {}
  if (state.password != state.confirmPassword) {
    state.errors.confirmPassword = "This doesn't match the password"
    return
  }

  try {
    const { summary } = await api.signUp({
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword
    })

    await initSPA(summary)
    navigateTo(next as string || "/learn")

    // await sprachy.initSPA(summary)
    // window.location.replace(next || "/learn")
    // if (next) {
    //   goto(next, { replaceState: true })
    // } else {
    //   goto("/learn", { replaceState: true })
    // }
  } catch (err: any) {
    // if (err?.response?.status == 422) {
    //   state.errors = errorsByField(err.response.data.errors)
    // } else

    if (err?.response?.data?.message) {
      state.errors.other = err.response.data.message
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
    <form @submit.prevent="signup">
      <div class="form-header">
        <NuxtLink href="/" class="header-logo">
          <SprachyLogo />
        </NuxtLink>
      </div>

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
      <fieldset class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input v-model="state.confirmPassword" name="confirm_password" id="confirm_password" type="password"
          :class="{ 'form-control': true, 'is-invalid': !!state.errors.confirmPassword }" placeholder="Confirm Password"
          minLength="10" required />
        <div v-if="state.errors.confirmPassword" class="invalid-feedback">
          {{ state.errors.confirmPassword }}
        </div>
      </fieldset>

      <!-- <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked={wantsReminderEmails}
                          id="wantsReminderEmails"
                          on:change|preventDefault={() =>
                            (wantsReminderEmails = !wantsReminderEmails)}
                        />
                        <label class="form-check-label" for="wantsReminderEmails">
                          Send me reminder emails when patterns are ready to review
                        </label>
                      </div> -->

      <div v-if="state.errors.other" class="text-danger">
        {{ state.errors.other }}
      </div>
      <button class="btn btn-sprachy" type="submit" :disabled="state.loading">Sign up</button>

      <hr />
      <p class="callout">
        <NuxtLink :href="next ? `/login?next=${next}` : '/login'">Sign in to an existing account</NuxtLink>
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

form fieldset {
  margin-top: 1rem;
}

form button {
  margin-top: 1rem;
  width: 100%;
}
</style>
