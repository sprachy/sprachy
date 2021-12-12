<template>
  <div>
    <page-not-found v-if="is404" :on-dismiss="onDismissError" />
    <unexpected-error-modal
      v-else-if="unexpectedError"
      :error="unexpectedError"
      :on-dismiss="onDismissError"
    />
    <keep-alive :max="10">
      <router-view :key="$route.fullPath + ($user ? `user-${$user.id}` : '')" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import SiteLayout from "./SiteLayout.vue"
import AdminLayout from "./AdminLayout.vue"
import { globalErrorHandler, NotFoundError } from "./globalErrorHandling"
import UnexpectedErrorModal from "./UnexpectedErrorModal.vue"
import PageNotFound from "./PageNotFound.vue"
import NProgress from "accessible-nprogress"
NProgress.configure({ showSpinner: false })

Vue.component("site-layout", SiteLayout)
Vue.component("admin-layout", AdminLayout)

import { Component, Vue, Watch } from "vue-property-decorator"
import _ from "lodash"
import type { HTTPProvider } from "./SprachyAPIClient"
@Component({
  components: {
    PageNotFound,
    UnexpectedErrorModal,
  },
  metaInfo() {
    return {
      title: "Sprachy",
    }
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
      const summary = JSON.parse(localStorage.getItem("summary")!)
      if (summary) {
        this.$initApp(summary)
        this.$app.refreshProgress()
      }
    } catch (err) {}
  }

  get unexpectedError() {
    return globalErrorHandler.lastGlobalError
  }

  get is404(): boolean {
    const err = this.unexpectedError as any
    return (
      !!(err instanceof NotFoundError) ||
      !!(err && "response" in err && err.response?.status === 404)
    )
  }

  @Watch("unexpectedError", { immediate: true })
  logoutOn401() {
    const err = this.unexpectedError as any
    if (err && "response" in err && err.response?.status === 401) {
      globalErrorHandler.dismissError()
      this.$closeApp()
      this.$routing.navigate("/login")
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
