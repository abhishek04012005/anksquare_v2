import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    // Initialize response and Supabase client
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // Verify session
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Auth error:', error)
      return redirectToLogin(req)
    }

    // Protected routes check
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!session) {
        return redirectToLogin(req)
      }

      // Optional: Add role-based protection
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || !user.email) {
        return redirectToLogin(req)
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return redirectToLogin(req)
  }
}

// Helper function for redirection
function redirectToLogin(req: NextRequest) {
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/admin/login'
  redirectUrl.searchParams.set('from', req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

// Update matcher configuration
export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}