<script lang="ts">
  import sprachy from "$lib/sprachy"
  import SiteLayout from "$lib/SiteLayout.svelte"
  const { spa, api } = sprachy.expectSPA()

  let errors: Record<string, string> = {}

  const params = new URLSearchParams(window.location.search)
</script>

<SiteLayout>
  <h1>Profile Settings</h1>
</SiteLayout>
