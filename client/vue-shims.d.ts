import { AdminAPI, UserAPI } from './ClientAPI'
import { VokabonApp } from './app'
import { User } from '../common/api'

declare module 'vue/types/vue' {
  interface Vue {
    $app: VokabonApp
    $debug: Record<string, any>
    $user: User
    $admin: boolean
    $api: UserAPI
    $backgroundApi: UserAPI
  }
}