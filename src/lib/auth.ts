import { supabase } from './supabase'

export async function signUpWithProfile(email: string, password: string, fullName: string) {
  // 1. Sign up user (The Supabase Postgres Trigger will now handle creating the profile & SS-XXXXXX ID)
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })

  if (authError) throw authError
  return authData
}
