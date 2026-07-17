import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytgveiwrkfoyqynmslnw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_0FGjipv0uHlub7Fus3W-lQ_mLf02Sjl';

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  console.log('Querying profiles table...')
  
  const { data, error } = await supabase.from('profiles').select('*')
  
  if (error) {
    console.error('ERROR:', error.message)
    return
  }
  
  console.log('Profiles:', data)
}

test()
