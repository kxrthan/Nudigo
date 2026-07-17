'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("LOGIN ERROR:", error.message);
    return redirect('/sign-in?message=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('name') as string // User's name field

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("SIGNUP ERROR:", error.message);
    return redirect('/sign-up?message=' + encodeURIComponent(error.message))
  }

  // If we have a full name, we could theoretically update the profiles table here, 
  // but since we have a Postgres trigger, we just let the trigger create it. 
  // We can update the full_name field in profiles after the trigger runs.
  if (data.user && fullName) {
    await supabase.from('profiles').update({ full_name: fullName }).eq('id', data.user.id);
  }

  // Log the user out immediately so they are forced to log in again, as requested by the user
  await supabase.auth.signOut();

  revalidatePath('/', 'layout')
  redirect('/sign-in?message=Account created successfully! Please log in.')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return redirect('/sign-in')

  const fullName = formData.get('name') as string
  
  await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id)

  revalidatePath('/dashboard/profile')
  redirect('/dashboard/profile?message=Profile updated successfully!')
}
