<template>
  <div>
    <unexpected-error-modal
      v-if="unexpectedError"
      :error="unexpectedError"
      :on-dismiss="onDismissError"
    />
    <router-view />
  </div>
</template>

<script lang="ts">
import SiteLayout from "./SiteLayout.vue"
import AdminLayout from "./AdminLayout.vue"
import { globalErrorHandler } from "./globalErrorHandling"
import UnexpectedErrorModal from "./UnexpectedErrorModal.vue"

Vue.component("site-layout", SiteLayout)
Vue.component("admin-layout", AdminLayout)

import { Component, Vue } from "vue-property-decorator"
import _ from "lodash"
@Component({
  components: {
    UnexpectedErrorModal,
  },
})
export default class App extends Vue {
  created() {
    globalErrorHandler.init({
      sentryScoper: (scope) => {
        // const { user } = app.state

        // if (user) {
        //   const userDetails: Record<string, any> = {
        //     name: user.name,
        //     username: user.username,
        //     id: user.id.toString(),
        //     role: user.role,
        //   }

        //   if (user.email) userDetails.email = user.email
        //   scope.setUser(userDetails)
        // }
      },
    })
  }
  get unexpectedError() {
    return globalErrorHandler.lastGlobalError
  }

  onDismissError() {
    globalErrorHandler.dismissError()
  }
}
</script>

<style lang="sass">
</style>
