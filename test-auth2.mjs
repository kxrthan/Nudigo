import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytgveiwrkfoyqynmslnw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_0FGjipv0uHlub7Fus3W-lQ_mLf02Sjl';
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  const testEmail = `test2_${Date.now()}@example.com`
  const password = 'password123'
  
  console.log('1. Signing up...')
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password,
  })
  
  if (signUpError) {
    console.error('SIGNUP ERROR:', signUpError.message)
    return
  }
  console.log('Signup success! User ID:', signUpData?.user?.id)

  console.log('2. Signing in...')
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password,
  })

  if (signInError) {
    console.error('SIGNIN ERROR:', signInError.message)
    return
  }
  
  console.log('SignIn success! Session:', !!signInData?.session)
}

test()
