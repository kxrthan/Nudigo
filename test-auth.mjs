import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytgveiwrkfoyqynmslnw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_0FGjipv0uHlub7Fus3W-lQ_mLf02Sjl';

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  console.log('Testing Supabase Auth Signup...')
  
  const testEmail = `test${Date.now()}@example.com`
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: 'password123',
  })
  
  if (error) {
    console.error('SIGNUP ERROR:', error.message)
    return
  }
  
  console.log('SIGNUP SUCCESS! User ID:', data?.user?.id)
  console.log('User confirmed_at:', data?.user?.confirmed_at)
  console.log('Session exists:', !!data?.session)
}

test()
