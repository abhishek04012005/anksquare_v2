'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    FiGrid, FiMessageSquare, FiPhone, 
    FiLogOut, FiMenu, FiX, FiUser 
} from 'react-icons/fi'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './AdminNavbar.module.css'

const menuItems = [
    {
        title: 'Dashboard',
        icon: <FiGrid />,
        path: '/admin/dashboard'
    },
    {
        title: 'Contacts',
        icon: <FiMessageSquare />,
        path: '/admin/dashboard/contact'
    },
    {
        title: 'Enquiries',
        icon: <FiPhone />,
        path: '/admin/dashboard/enquiry'
    }
]

const AdminNavbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [userName, setUserName] = useState<string | null>(null)
    const supabase = createClientComponentClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUserName(user?.email?.split('@')[0] || 'Admin')
        }
        getUser()
    }, [supabase.auth])

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/admin/login')
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <div className={styles.brand}>
                        <Link href="/admin/dashboard">
                            <span className={styles.logo}>Admin Panel</span>
                        </Link>
                        <button 
                            className={styles.mobileMenuButton}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>

                    <div className={`${styles.menuContainer} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
                        <ul className={styles.menu}>
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link 
                                        href={item.path}
                                        className={`${styles.menuItem} ${
                                            pathname === item.path ? styles.active : ''
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                        {pathname === item.path && (
                                            <motion.div
                                                className={styles.activeIndicator}
                                                layoutId="activeIndicator"
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.userSection}>
                            <div className={styles.userInfo}>
                                <FiUser />
                                <span>{userName}</span>
                            </div>
                            <button 
                                className={styles.logoutButton}
                                onClick={handleLogout}
                            >
                                <FiLogOut />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Mobile menu backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdrop}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default AdminNavbar