<template>
  <main class="container">
    <b-form @submit.prevent="login">
      <b-form-group label="Email" label-for="emailInput">
        <b-form-input
          name="email"
          id="emailInput"
          placeholder="Email"
          required
          autofocus
          v-model="email"
        />
      </b-form-group>
      <b-form-group label="Password" label-for="passwordInput" class="mt-2">
        <b-form-input
          name="password"
          id="passwordInput"
          type="password"
          placeholder="Password"
          required
          v-model="password"
        />
      </b-form-group>
      <input type="hidden" name="then" :value="afterAuthUrl" />
      <b-btn type="submit" class="mt-2">Sign in</b-btn>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <hr />
      <router-link to="/signup">Sign up</router-link>
    </b-form>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"

@Component({
  metaInfo() {
    return {
      title: "Login - Sprachy",
    }
  },
})
export default class LoginPage extends Vue {
  email: string = ""
  password: string = ""
  afterAuthUrl: string = ""
  errorMessage: string | null = null

  async login() {
    const { email, password } = this
    this.errorMessage = null

    try {
      const user = await this.$api.signIn({ email, password })
      this.$app.user = user
      localStorage.setItem("user", JSON.stringify(user))
      this.$app.navigate("/home")
    } catch (err: any) {
      if (err?.response?.data?.code === "authentication failed") {
        this.errorMessage = "Invalid email or password"
      } else {
        throw err
      }
    }
  }

  postLoginRedirect() {
    this.$app.router.replace({
      name: "home",
    })
  }
}
</script>

<style lang="sass" scoped>
main
  height: calc(100vh - 5rem)
  display: flex
  align-items: center
  justify-content: center
</style>
