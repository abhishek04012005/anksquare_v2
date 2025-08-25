'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import clsx from 'clsx';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Logo from "../../assets/logo.png";

interface LinkItem {
  name: string;
  path: string;
}

const navItems: LinkItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderMenuItems = (isMobile = false) =>
    navItems.map((item) => (
      <Link
        key={item.name}
        href={item.path}
        className={isMobile ? styles.mobileMenuLink : styles.menuLink}
        onClick={handleNavigate}
      >
        {item.name}
      </Link>
    ));

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <Image src={Logo} alt="Ditvi Technologies" className={styles.logoImage}  />
          </Link>

 
          <div className={styles.desktopMenu}>{renderMenuItems(false)}</div>

 
          <button
            className={clsx(styles.mobileMenuToggle, { [styles.active]: isOpen })}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={clsx(styles.mobileMenu, { [styles.show]: isOpen })}>
          {renderMenuItems(true)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
