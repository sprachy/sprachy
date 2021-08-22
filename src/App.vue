<template>
<div>
  <router-view/>
  <!-- <main class="container">
    <h1>vokabon!</h1>
    <p>Learn German vocab from the roots</p>
    <form @submit.prevent="login">
      <h4 className="mb-4">Login</h4>
      <div className="form-group">
          <label for="email">Email</label>
          <input name="email" id="email" className="form-control" placeholder="Email" required v-model="email" />
      </div>
      <div className="form-group">
          <label for="password">Password</label>
          <input name="password" id="password" type="password" className="form-control" placeholder="Password" :minLength="10" required v-model="password" />
      </div>
      <input type="hidden" name="then" :value="afterAuthUrl" />
      <button type="submit" className="btn">Login</button>
    </form>
    <form @submit.prevent="signup">
      <h4 className="mb-4">Create your account</h4>
      <div className="form-group">
          <label for="email">Email</label>
          <input name="email" id="email" className="form-control" placeholder="Email" required v-model="email" />
      </div>
      <div className="form-group">
          <label for="password">Password</label>
          <input name="password" id="password" type="password" className="form-control" placeholder="Password" :minLength="10" required v-model="password" />
      </div>
      <input type="hidden" name="then" :value="afterAuthUrl" />
      <button type="submit" className="btn">Sign up</button>
    </form>
  </main> -->
</div>
</template>

<script lang="ts">
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

// Initialize Firebase
initializeApp({
  apiKey: "AIzaSyAd3VXtvNoQEbX0s_PliQ8qy863xOB77r0",
  authDomain: "vokabon.firebaseapp.com",
  projectId: "vokabon",
  storageBucket: "vokabon.appspot.com",
  messagingSenderId: "1044678992358",
  appId: "1:1044678992358:web:4eb5b16967ac86b01ab627",
  measurementId: "G-96PLGCSKWE",
})

const auth = getAuth()

import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
@Component({
  components: {},
})
export default class App extends Vue {
  email: string = ""
  password: string = ""
  afterAuthUrl: string = ""

  async signup() {
    const { email, password } = this
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    console.log(userCredential)
  }

  async login() {
    const { email, password } = this
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    
  }
}
</script>

<style lang="sass">
@import "node_modules/bootstrap/scss/bootstrap"
</style>
