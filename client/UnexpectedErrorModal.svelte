<script lang="ts">
  import type { AxiosError } from "axios"
  import _ from "lodash"
  import Modal from "./Modal.svelte"

  export let error: Error | AxiosError
  export let onDismiss: () => void

  $: axiosError = "response" in error ? (error as AxiosError<any>) : null

  $: serverResponse = axiosError ? axiosError.response : null

  $: serverResponseHTML = serverResponse
    ? _.isString(serverResponse.data)
      ? serverResponse.data
      : `<pre>${JSON.stringify(serverResponse.data, null, 2)}</pre>`
    : null
</script>

<Modal open={true}>
  <div class="modal-header">
    {#if axiosError && serverResponse}
      <h5>
        {serverResponse.data.message || "Server error"}
      </h5>
      <pre>{serverResponse.status} {serverResponse.statusText} from {axiosError
          .config.url}</pre>
      <p>
        Sprachy encountered an unexpected error. Please screenshot this message
        and report it to the development team.
      </p>
      <iframe
        title="Server error details"
        srcdoc={serverResponseHTML || undefined}
      />
    {:else}
      <h5>{error.message}</h5>
      <p>
        Sprachy encountered an unexpected error. Please screenshot this message
        and report it to the development team.
      </p>
    {/if}
    <button type="button" aria-label="Close" class="close" on:click={onDismiss}>
      ×
    </button>
  </div>

  <div class="modal-body">
    <pre>{error.stack}</pre>
  </div>

  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" on:click={onDismiss}
      >Continue</button
    >
  </div>
</Modal>

<style lang="sass">
.modal-header
  max-width: 100%
  h5, pre
    color: red

  iframe
    width: 100%
    height: 600px

.modal-body
  pre
    white-space: pre-wrap
    font-size: 80%
</style>
