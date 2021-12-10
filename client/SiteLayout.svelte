<script lang="ts">
  import SiteHeader from "./SiteHeader.svelte"
</script>

<div class="site-layout">
  <SiteHeader />
  <div class="container" id="main">
    <slot />
  </div>
</div>

<style lang="sass" scoped>
#main
  padding-top: 1.5rem
</style>
