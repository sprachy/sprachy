<script lang="ts">
  import type { AxiosError } from "axios"
  import UnexpectedErrorModal from "./UnexpectedErrorModal.svelte"

  export let error: Error

  const axiosError = "response" in error && (error as AxiosError)

  if (axiosError && axiosError.response?.status === 401) {
    // Go to login page
    localStorage.removeItem("summary")
    window.location.replace("/login")
  }

  function onDismiss() {
    window.location.reload()
  }

  // Trigger reload on next page transition so
  // the app doesn't stay broken
  window.addEventListener("popstate", () => {
    window.location.reload()
  })
</script>

<UnexpectedErrorModal {error} {onDismiss} />
