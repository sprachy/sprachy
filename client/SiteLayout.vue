<!-- Default app layout for logged in users: Navbar, container with router view -->
<template>
  <div class="site-layout">
    <site-header />

    <template v-if="noContainer">
      <slot />
    </template>
    <template v-else>
      <b-container id="main">
        <slot />
      </b-container>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import SiteHeader from "./SiteHeader.vue"

@Component({
  components: {
    SiteHeader,
  },
})
export default class SiteLayout extends Vue {
  @Prop({ type: Boolean, default: false }) noContainer!: boolean
}
</script>

<style lang="sass" scoped>
#main
  padding-top: 1.5rem
</style>
