import type { AdminAPI, UserAPI } from './SprachyAPIClient'
import type { SprachyApp } from './app'
import type { ProgressSummary, User } from '../common/api'
import type { SprachyRouter } from './router'

declare module 'vue/types/vue' {
  interface Vue {
    $app: SprachyApp
    $initApp: (summary: ProgressSummary) => void
    $closeApp: () => void
    $debug: Record<string, any>
    $user: User
    $admin: boolean
    $api: UserAPI
    $backgroundApi: UserAPI
    $routing: SprachyRouter
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    metaInfo?: (this: V) => any
  }
}
