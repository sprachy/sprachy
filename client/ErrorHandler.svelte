<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import UnexpectedErrorModal from "./UnexpectedErrorModal.svelte"

  let unexpectedError: Error | null = null

  function onDismissError() {
    unexpectedError = null
    // dispatch("dismissError")
  }

  // const dispatch = createEventDispatcher()

  function onUnhandledError(err: Error) {
    console.error(err)
    unexpectedError = err
  }

  // window.addEventListener("error", (ev) => {
  //   onUnhandledError(ev.error)
  //   ev.preventDefault()
  // })
  // window.addEventListener("unhandledrejection", (ev) => {
  //   onUnhandledError(ev.reason)
  //   ev.preventDefault()
  // })
</script>

<div>
  {#if unexpectedError}
    <UnexpectedErrorModal error={unexpectedError} onDismiss={onDismissError} />
  {/if}
  <Boundary onError={onUnhandledError}>
    <slot />
  </Boundary>
</div>
