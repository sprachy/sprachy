<template>
  <main class="container">
    <form @submit.prevent="login">
      <h4 className="mb-4">Login</h4>
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
      <b-btn type="submit" class="mt-2">Login</b-btn>
      <div v-if="errorMessage">
        {{errorMessage}}
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"

@Component({
  components: {},
})
export default class LoginPage extends Vue {
  email: string = ""
  password: string = ""
  afterAuthUrl: string = ""
  errorMessage: string|null = null

  async login() {
    const { email, password } = this
    this.errorMessage = null

    try {
      await this.$api.signIn({ email, password })
    } catch (err) {
      this.errorMessage = err.message
    }
  }

  postLoginRedirect() {
    this.$app.router.replace({
      name: 'home'
    })
  }
}
</script>

<style lang="sass">
main
  height: calc(100vh - 5rem)
  display: flex
  align-items: center
  justify-content: center
</style>
