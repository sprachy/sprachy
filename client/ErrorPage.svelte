<script lang="ts">
  import UnexpectedErrorModal from "./UnexpectedErrorModal.svelte"

  export let error: Error

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
