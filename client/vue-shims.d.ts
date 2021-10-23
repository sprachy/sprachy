import { AdminAPI, UserAPI } from './ClientAPI'
import { SprachyApp } from './app'
import { User } from '../common/api'

declare module 'vue/types/vue' {
  interface Vue {
    $app: SprachyApp
    $debug: Record<string, any>
    $user: User
    $admin: boolean
    $api: UserAPI
    $backgroundApi: UserAPI
  }
}