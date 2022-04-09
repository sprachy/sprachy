<script lang="ts" context="module">
  import { isAuthedRoute } from "$lib/routing"
  import type { Load } from "./__layout"

  export const load: Load = async ({ url, session }) => {
    const needsAuth = isAuthedRoute(url.pathname)
    const loggedIn = !!session.userId

    if (!loggedIn && needsAuth) {
      return {
        status: 303,
        redirect: "/login?next=" + encodeURIComponent(url.pathname),
      }
    } else {
      return {}
    }
  }
</script>

<script lang="ts">
  import { browser } from "$app/env"
  import { navigating, session } from "$app/stores"
  import { page } from "$app/stores"
  import sprachy from "$lib/sprachy"
  import PreloadingIndicator from "$lib/PreloadingIndicator.svelte"
  let initializing: boolean = true

  let loadingPromises: Set<Promise<any>> = new Set()

  if (browser) {
    const { api } = sprachy.expectBrowser()

    api.http.onRequest = (req) => {
      loadingPromises.add(req)
      loadingPromises = loadingPromises
      req.then(() => {
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

  if (browser && $session.userId && !sprachy.spa && !$page.error) {
    startSPA()
  } else {
    initializing = false
  }
</script>

{#if initializing || $navigating || loadingPromises.size > 0}
  <PreloadingIndicator />
{/if}

{#if !initializing}
  <slot />
{/if}

<style lang="sass" global>
  @import '../app.sass'
</style>
