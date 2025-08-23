'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import styles from './Navbar.module.css'

const navItems = {
    main: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        {
            name: 'Work',
            type: 'dropdown',
            subItems: [
                {
                    name: 'Business',
                    type: 'submenu',
                    subItems: [
                        { name: 'Portfolio', path: '/work/business/portfolio' },
                        { name: 'Visiting Card', path: '/work/business/visiting-card' },
                        { name: 'Website', path: '/work/business/website' }
                    ]
                },
                {
                    name: 'Education',
                    type: 'submenu',
                    subItems: [
                        { name: 'Resume', path: '/work/education/resume' },
                        { name: 'Personal Portfolio Website', path: '/work/education/portfolio' }
                    ]
                },
                {
                    name: 'Events',
                    type: 'submenu',
                    subItems: [
                        {
                            name: 'Birthday',
                            type: 'submenu',
                            subItems: [
                                { name: 'Website', path: '/work/events/birthday/website' },
                                { name: 'Ecard', path: '/work/events/birthday/ecard' },
                                { name: 'Video', path: '/work/events/birthday/video' }
                            ]
                        },
                        {
                            name: 'Wedding',
                            type: 'submenu',
                            subItems: [
                                { name: 'Website', path: '/work/events/wedding/website' },
                                { name: 'Ecard', path: '/work/events/wedding/ecard' },
                                { name: 'Video', path: '/work/events/wedding/video' },
                                { name: 'Biodata', path: '/work/events/wedding/biodata' }
                            ]
                        }
                    ]
                }
            ]
        },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' }
    ]
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdowns, setActiveDropdowns] = useState<Set<string>>(new Set())
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setActiveDropdowns(new Set())
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
        if (isOpen) {
            setActiveDropdowns(new Set())
        }
    }

    const toggleDropdown = (key: string) => {
        setActiveDropdowns(prev => {
            const newSet = new Set(prev)
            if (newSet.has(key)) {
                newSet.delete(key)
            } else {
                newSet.add(key)
            }
            return newSet
        })
    }

    const renderSubMenu = (items: any[], parentKey: string) => {
        return (
            <div className={`${styles.submenu} ${activeDropdowns.has(parentKey) ? styles.active : ''}`}>
                {items.map((item, index) => {
                    const currentKey = `${parentKey}-${item.name}`
                    return (
                        <div key={index} className={styles.submenuItem}>
                            {item.type === 'submenu' ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(currentKey)}
                                        className={`${styles.submenuButton} ${activeDropdowns.has(currentKey) ? styles.active : ''}`}
                                    >
                                        {item.name}
                                        <MdKeyboardArrowDown
                                            className={`${styles.arrow} ${activeDropdowns.has(currentKey) ? styles.rotated : ''}`}
                                        />
                                    </button>
                                    {renderSubMenu(item.subItems, currentKey)}
                                </>
                            ) : (
                                <Link
                                    href={item.path}
                                    className={styles.submenuLink}
                                    onClick={() => {
                                        setIsOpen(false)
                                        setActiveDropdowns(new Set())
                                    }}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <nav className={styles.navbar} ref={navRef}>
            <div className={styles.container}>
                <div className={styles.navContent}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>Ditvi</span>
                        Technologies
                    </Link>

                    <div className={styles.desktopMenu}>
                        {navItems.main.map((item, index) => (
                            <div key={index} className={styles.menuItem}>
                                {item.type === 'dropdown' ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className={`${styles.menuButton} ${activeDropdowns.has(item.name) ? styles.active : ''}`}
                                        >
                                            {item.name}
                                            <MdKeyboardArrowDown className={`${styles.arrow} ${activeDropdowns.has(item.name) ? styles.rotated : ''}`} />
                                        </button>
                                        {renderSubMenu(item.subItems, item.name)}
                                    </>
                                ) : item.path ? (
                                    <Link href={item.path} className={styles.menuLink}>
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className={styles.menuLink}>{item.name}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        className={`${styles.mobileMenuButton} ${isOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
                    </button>
                </div>

                <div className={`${styles.mobileMenu} ${isOpen ? styles.show : ''}`}>
                    {navItems.main.map((item, index) => (
                        <div key={index} className={styles.mobileMenuItem}>
                            {item.type === 'dropdown' ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(`mobile-${item.name}`)}
                                        className={`${styles.mobileMenuButton} ${activeDropdowns.has(`mobile-${item.name}`) ? styles.active : ''}`}
                                    >
                                        {item.name}
                                        <MdKeyboardArrowDown className={`${styles.arrow} ${activeDropdowns.has(`mobile-${item.name}`) ? styles.rotated : ''}`} />
                                    </button>
                                    {renderSubMenu(item.subItems, `mobile-${item.name}`)}
                                </>
                            ) : item.path ? (
                                <Link
                                    href={item.path}
                                    className={styles.mobileMenuLink}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <span className={styles.mobileMenuLink}>{item.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
