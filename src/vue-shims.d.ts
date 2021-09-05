import { SupabaseClient } from '@supabase/supabase-js'
import { AdminAPI, UserAPI } from './api'
import { VokabonApp } from './app'

declare module 'vue/types/vue' {
  interface Vue {
    $app: VokabonApp
    $debug: Record<string, any>
    $api: UserAPI
    $adminApi: AdminAPI
    $db: SupabaseClient
  }
}