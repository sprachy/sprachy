<template>
  <b-modal
    id="unexpectedErrorModal"
    v-model="showErrorModal"
    ok-only
    size="lg"
  >
    <template
      slot="modal-header"
      slot-scope="{ close }"
    >
      <div v-if="serverResponse">
        <h5>{{ serverResponse.data.message ? serverResponse.data.message : 'Server error' }}</h5>
        <pre>{{ serverResponse.status }} {{ serverResponse.statusText }} from {{ error.config.url }}</pre>
        <p>Vokabon encountered an unexpected error. Please screenshot this message and report it to the development team.</p>
        <iframe :srcdoc="serverResponseHTML" />
      </div>
      <div v-else>
        <h5>{{ error.message }}</h5>
        <p>Vokabon encountered an unexpected error. Please screenshot this message and report it to the development team.</p>
      </div>
      <button
        type="button"
        aria-label="Close"
        class="close"
        @click="close()"
      >
        ×
      </button>
    </template>

    <pre>{{ error.stack }}</pre>

    <template slot="modal-ok">
      Continue
    </template>
  </b-modal>
</template>

<script lang="ts">
import type { AxiosError, AxiosResponse } from 'axios'
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import * as _ from 'lodash'

@Component
export default class CheckerErrorModal extends Vue {
  @Prop({ type: Error, required: true }) error!: Error|AxiosError
  @Prop({ type: Function, required: true }) onDismiss!: () => void
  showErrorModal: boolean = true

  get serverResponse(): AxiosResponse|null {
    return 'response' in this.error && this.error.response ? this.error.response : null
  }

  /** The server response may be HTML or JSON. This represents both as HTML for an iframe. */
  get serverResponseHTML(): string|null {
    if (!this.serverResponse)
      return null

    if (_.isString(this.serverResponse.data))
      return this.serverResponse.data
    else
      return `<pre>${JSON.stringify(this.serverResponse.data, null, 2)}</pre>`
  }

  @Watch('showErrorModal')
  onErrorModalChange() {
    if (!this.showErrorModal) {
      this.onDismiss()
    }
  }
}
</script>

<style lang="sass">
#unexpectedErrorModal
  h5, .modal-header pre
    color: red

  header > div
    max-width: 100%

  pre
    white-space: pre-wrap
    font-size: 80%

  iframe
    width: 100%
    height: 600px
</style>
