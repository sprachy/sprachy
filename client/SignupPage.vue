<template>
  <main class="container">
    <form @submit.prevent="signup">
      <h4 class="mb-4">Create your account</h4>
      <b-form-group label="Email">
        <b-input
          name="email"
          id="email"
          className="form-control"
          placeholder="Email"
          required
          v-model="email"
        />
      </b-form-group>
      <b-form-group label="Password">
        <b-input
          name="password"
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          :minLength="10"
          required
          v-model="password"
        />
      </b-form-group>
      <input type="hidden" name="then" :value="afterAuthUrl" />
      <b-btn type="submit" className="btn">Sign up</b-btn>
      <div v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <hr />
      <router-link to="/login">Sign in</router-link>
    </form>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"

@Component({
  components: {},
})
export default class SignupPage extends Vue {
  email: string = ""
  password: string = ""
  afterAuthUrl: string = ""
  errorMessage: string | null = null

  created() {
    document.title = "Signup - Vokabon"
  }

  async signup() {
    const { email, password } = this

    try {
      const user = await this.$api.signUp({ email, password })
      this.$app.user = user
      localStorage.setItem("user", JSON.stringify(user))
      this.$app.navigate("/home")
    } catch (err) {
      throw err
    }
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
