import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Login from '@/admin/login/Login'

export const metadata = {
  title: 'Admin Login | Ditvi Technologies',
  description: 'Secure admin login portal for Ditvi Technologies'
}

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data: { session } } = await supabase.auth.getSession()

    // If already logged in, redirect to dashboard
    if (session) {
      redirect('/admin/dashboard')
    }

    return <Login />
  } catch (error) {
    console.error('Auth error:', error)
    // Handle error gracefully
    return (
      <div>
        <p>Authentication error. Please try again later.</p>
      </div>
    )
  }
}