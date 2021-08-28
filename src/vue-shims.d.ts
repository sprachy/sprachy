import { VokabonApp } from './app'

declare module 'vue/types/vue' {
  interface Vue {
    $app: VokabonApp
  }
}