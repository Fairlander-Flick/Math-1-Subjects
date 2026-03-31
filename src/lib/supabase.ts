import { createClient } from '@supabase/supabase-js'

// Provide fallback values so the app won't crash immediately,
// but auth will only work once the real keys are added.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
