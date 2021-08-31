import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://emiwtmbwvmyoxyxxlwbv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDQwNTM0NiwiZXhwIjoxOTQ1OTgxMzQ2fQ.F4oJH0B3Zugi7TZcq5solrKrNg_8lAp9ZHhsZ2jtFAg'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
