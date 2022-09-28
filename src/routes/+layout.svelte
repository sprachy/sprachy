<script lang="ts">
  import "accessible-nprogress/dist/accessible-nprogress.css"
  import "bootstrap/dist/css/bootstrap.min.css"
  import "../app.css"

  import { browser } from "$app/environment"
  import { navigating } from "$app/stores"
  import { page } from "$app/stores"
  import sprachy from "$lib/sprachy"
  import PreloadingIndicator from "$lib/PreloadingIndicator.svelte"
  import SiteLayout from "$lib/SiteLayout.svelte"
  let initializing: boolean = true

  export let data: { userId?: string }

  let loadingPromises: Set<Promise<any>> = new Set()

  if (browser) {
    const { api } = sprachy.expectBrowser()

    api.http.onRequest = (req) => {
      loadingPromises.add(req)
      loadingPromises = loadingPromises
      req.finally(() => {
        loadingPromises.delete(req)
        loadingPromises = loadingPromises
      })
    }
  }

  async function startSPA() {
    try {
      await sprachy.initSPA()
    } finally {
      initializing = false
    }
  }

  if (browser && data.userId && !sprachy.spa && !$page.error) {
    startSPA()
  } else {
    initializing = false
  }
</script>

{#if initializing || $navigating || loadingPromises.size > 0}
  <PreloadingIndicator />
{/if}

{#if !initializing}
  <SiteLayout>
    <slot />
  </SiteLayout>
{/if}
