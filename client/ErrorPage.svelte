<script lang="ts">
  import type { AxiosError } from "axios"
  import UnexpectedErrorModal from "./UnexpectedErrorModal.svelte"

  export let error: Error

  const axiosError = "response" in error && (error as AxiosError)

  function onDismiss() {
    window.location.reload()
  }

  // Trigger reload on next page transition so
  // the app doesn't stay broken
  window.addEventListener("popstate", () => {
    window.location.reload()
  })

  // In development, force a full refresh on code
  // change
  ;(module as any).hot.addStatusHandler(() => {
    window.location.reload()
  })
</script>

<UnexpectedErrorModal {error} {onDismiss} />
