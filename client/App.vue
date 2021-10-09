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
import NProgress from 'accessible-nprogress'
NProgress.configure({ showSpinner: false })

Vue.component("site-layout", SiteLayout)
Vue.component("admin-layout", AdminLayout)

import { Component, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
import type { HTTPProvider } from "./api"
@Component({
  components: {
    UnexpectedErrorModal,
  },
})
export default class App extends Vue {
  http: HTTPProvider = this.$api.http

  async created() {
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
    

    try {
      const user = JSON.parse(localStorage.getItem('user')!)
      this.$app.user = user
    } catch (err) {}

    const { user } = await this.$backgroundApi.getStatus()
    this.$app.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  get unexpectedError() {
    return globalErrorHandler.lastGlobalError
  }

  @Watch("unexpectedError", { immediate: true })
  logoutOn401() {
    const err = this.unexpectedError as any
    if (err && 'response' in err && err.response?.status === 401) {
      globalErrorHandler.dismissError()
      this.$app.user = null
      localStorage.removeItem('user')
      this.$app.navigate("/login")
    }
  }

  get ongoingRequests() {
    return this.http.ongoingRequests
  }

  @Watch("ongoingRequests", { immediate: true })
  applyLoadingIndicator() {
    for (const req of this.$api.http.ongoingRequests) {
      NProgress.promise(req)
    }
  }


  onDismissError() {
    globalErrorHandler.dismissError()
  }
}
</script>

<style lang="sass">
</style>
