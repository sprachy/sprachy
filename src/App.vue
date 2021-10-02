<template>
<div>
  <router-view/>
</div>
</template>

<script lang="ts">
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
