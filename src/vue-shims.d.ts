import { SupabaseClient } from '@supabase/supabase-js'
import { AdminAPI } from './AdminAPI'
import { VokabonApp } from './app'

declare module 'vue/types/vue' {
  interface Vue {
    $app: VokabonApp
    $debug: Record<string, any>
    $adminApi: AdminAPI
    $db: SupabaseClient
  }
}