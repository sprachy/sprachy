<template>
<div>
  <router-view/>
</div>
</template>

<script lang="ts">
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'http://localhost:8000'
const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJhdWQiOiIiLCJzdWIiOiIiLCJSb2xlIjoicG9zdGdyZXMifQ.magCcozTMKNrl76Tj2dsM7XTl_YH0v0ilajzAvIlw3U'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// // Initialize Firebase
// initializeApp({
//   apiKey: "AIzaSyAd3VXtvNoQEbX0s_PliQ8qy863xOB77r0",
//   authDomain: "vokabon.firebaseapp.com",
//   projectId: "vokabon",
//   storageBucket: "vokabon.appspot.com",
//   messagingSenderId: "1044678992358",
//   appId: "1:1044678992358:web:4eb5b16967ac86b01ab627",
//   measurementId: "G-96PLGCSKWE",
// })

import SiteLayout from './SiteLayout.vue'

Vue.component('site-layout', SiteLayout)

import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
@Component({
  components: {},
})
export default class App extends Vue {
}
</script>

<style lang="sass">
</style>
