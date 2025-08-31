// 'use client'
// import { createContext, useContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import type { User } from '@supabase/supabase-js'

// interface AuthContextType {
//   user: User | null
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()
//   const supabase = createClientComponentClient()

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (session) {
//           setUser(session.user)
//         } else {
//           setUser(null)
//           router.push('/admin/login')
//         }
//         setLoading(false)
//       }
//     )

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [router, supabase])

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }