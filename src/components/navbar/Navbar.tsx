'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
} from 'react'
import Link from 'next/link'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import clsx from 'clsx'
import styles from './Navbar.module.css'

// --- 1. Strongly-typed menu items ----------------------------------------------------------------

interface LinkItem {
  name: string
  path: string
}

interface GroupItem {
  name: string
  type: 'dropdown' | 'submenu'
  subItems: MenuItem[]
}

type MenuItem = LinkItem | GroupItem

const navItems: { main: MenuItem[] } = {
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
            { name: 'Website', path: '/work/business/website' },
          ],
        },
        {
          name: 'Education',
          type: 'submenu',
          subItems: [
            { name: 'Resume', path: '/work/education/resume' },
            {
              name: 'Personal Portfolio Website',
              path: '/work/education/portfolio',
            },
          ],
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
                { name: 'Video', path: '/work/events/birthday/video' },
              ],
            },
            {
              name: 'Wedding',
              type: 'submenu',
              subItems: [
                { name: 'Website', path: '/work/events/wedding/website' },
                { name: 'Ecard', path: '/work/events/wedding/ecard' },
                { name: 'Video', path: '/work/events/wedding/video' },
                { name: 'Biodata', path: '/work/events/wedding/biodata' },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ],
}

// --- 2. Recursive submenu component ----------------------------------------------------------------

interface RenderSubMenuProps {
  items: MenuItem[]
  parentKey: string
  activeDropdowns: Set<string>
  toggleDropdown: (key: string) => void
  onNavigate: () => void
}

const RenderSubMenu: React.FC<RenderSubMenuProps> = ({
  items,
  parentKey,
  activeDropdowns,
  toggleDropdown,
  onNavigate,
}) => {
  return (
    <div
      className={clsx(styles.submenu, {
        [styles.active]: activeDropdowns.has(parentKey),
      })}
    >
      {items.map((item) => {
        // deterministic key
        const keyId = `${parentKey}-${item.name
          .toLowerCase()
          .replace(/\s+/g, '-')}`

        // group (dropdown / submenu)
        if ('subItems' in item) {
          return (
            <div key={keyId} className={styles.submenuItem}>
              <button
                type="button"
                onClick={() => toggleDropdown(keyId)}
                className={clsx(styles.submenuButton, {
                  [styles.active]: activeDropdowns.has(keyId),
                })}
              >
                {item.name}
                <MdKeyboardArrowDown
                  aria-hidden="true"
                  className={clsx(styles.arrow, {
                    [styles.rotated]: activeDropdowns.has(keyId),
                  })}
                />
              </button>

              <RenderSubMenu
                items={item.subItems}
                parentKey={keyId}
                activeDropdowns={activeDropdowns}
                toggleDropdown={toggleDropdown}
                onNavigate={onNavigate}
              />
            </div>
          )
        }

        // plain link
        return (
          <div key={keyId} className={styles.submenuItem}>
            <Link href={item.path} className={styles.submenuLink} onClick={onNavigate}>
              {item.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

// --- 3. Navbar component ---------------------------------------------------------------------------

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeDropdowns, setActiveDropdowns] = useState<Set<string>>(
    () => new Set()
  )
  const navRef = useRef<HTMLDivElement>(null)

  // close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdowns(new Set())
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // menu toggle
  const toggleMenu = useCallback(() => {
    setIsOpen((open) => {
      if (open) setActiveDropdowns(new Set())
      return !open
    })
  }, [])

  // dropdown toggle
  const toggleDropdown = useCallback((key: string) => {
    setActiveDropdowns((prev) => {
      const copy = new Set(prev)
      if (copy.has(key)) copy.delete(key)
      else copy.add(key)
      return copy
    })
  }, [])

  // close everything on navigation
  const handleNavigate = useCallback(() => {
    setIsOpen(false)
    setActiveDropdowns(new Set())
  }, [])

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Ditvi</span> Technologies
          </Link>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {navItems.main.map((item) => {
              const keyId = item.name.toLowerCase().replace(/\s+/g, '-')

              if ('subItems' in item) {
                // dropdown toggle
                return (
                  <div key={keyId} className={styles.menuItem}>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(keyId)}
                      className={clsx(styles.menuButton, {
                        [styles.active]: activeDropdowns.has(keyId),
                      })}
                    >
                      {item.name}
                      <MdKeyboardArrowDown
                        aria-hidden="true"
                        className={clsx(styles.arrow, {
                          [styles.rotated]: activeDropdowns.has(keyId),
                        })}
                      />
                    </button>

                    <RenderSubMenu
                      items={item.subItems}
                      parentKey={keyId}
                      activeDropdowns={activeDropdowns}
                      toggleDropdown={toggleDropdown}
                      onNavigate={handleNavigate}
                    />
                  </div>
                )
              }

              // plain link
              return (
                <Link key={keyId} href={item.path} className={styles.menuLink}>
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile toggle button */}
          <button
            className={clsx(styles.mobileMenuButton, {
              [styles.active]: isOpen,
            })}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(styles.mobileMenu, {
            [styles.show]: isOpen,
          })}
        >
          {navItems.main.map((item) => {
            const keyId = `mobile-${item.name
              .toLowerCase()
              .replace(/\s+/g, '-')}`

            if ('subItems' in item) {
              return (
                <div key={keyId} className={styles.mobileMenuItem}>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(keyId)}
                    className={clsx(styles.mobileMenuButton, {
                      [styles.active]: activeDropdowns.has(keyId),
                    })}
                  >
                    {item.name}
                    <MdKeyboardArrowDown
                      aria-hidden="true"
                      className={clsx(styles.arrow, {
                        [styles.rotated]: activeDropdowns.has(keyId),
                      })}
                    />
                  </button>

                  <RenderSubMenu
                    items={item.subItems}
                    parentKey={keyId}
                    activeDropdowns={activeDropdowns}
                    toggleDropdown={toggleDropdown}
                    onNavigate={handleNavigate}
                  />
                </div>
              )
            }

            return (
              <Link
                key={keyId}
                href={item.path}
                className={styles.mobileMenuLink}
                onClick={handleNavigate}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
