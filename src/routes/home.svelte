<script lang="ts">
  import _ from "lodash"
  import SiteLayout from "$lib/SiteLayout.svelte"
  import PatternIndex from "$lib/PatternIndex.svelte"
</script>

<SiteLayout>
  <div class="home">
    <hr />
    <div class="patterns">
      <h2>All patterns</h2>
      <PatternIndex />
    </div>
  </div>
</SiteLayout>
