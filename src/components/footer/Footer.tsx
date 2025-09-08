'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import styles from './Footer.module.css'
import { socialLinks } from '@/json/anksquareinfo'
import { contactDetails } from '@/json/anksquareinfo'
import imageLoader from '../../../image-loader'


const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Clients', href: '/client' },
    { name: 'Admin', href: '/admin/login' }
]

const webdevelopment = [
    { name: 'Business Website', href: '/service/business-website' },
    { name: 'E-commerce Website', href: '/service/ecommerce-website' },
    { name: 'Real Estate Website', href: '/service/real-estate-website' },
    { name: 'Education Website', href: '/service/education-website' },
]

const accountmanagement = [
    { name: 'Amazon', href: '/service/amazon' },
    { name: 'Flipkart', href: '/service/flipkart' },
    { name: 'Blinkit', href: '/service/blinkit' },
    { name: 'Myntra', href: '/service/myntra' },
    { name: 'Meesho', href: '/service/meesho' },
    { name: 'Ajio', href: '/service/ajio' },
    { name: 'JioMart', href: '/service/jiomart' },
    { name: 'Nykaa', href: '/service/nykaa' }
]



const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.companyInfo}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                loader={imageLoader}
                                src="./logo.svg"
                                alt="Anksquare"
                                width={1000}
                                height={1000}
                                className={styles.logoImage}
                            />
                        </Link>
                        <p className={styles.description}>
                            Empowering businesses with innovative digital solutions. Transform your vision into reality with our expertise.
                        </p>
                        <div className={styles.contact}>
                            <div className={styles.contactItem}>
                                <FiMail />
                                <a href="mailto:info@ditvitechnologies.com">{contactDetails.email}</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FiPhone />
                                <a href={`tel:${contactDetails.number}`}>{contactDetails.number}</a>
                            </div>
                            <div className={styles.contactItem}>
                                <FiMapPin />
                                <span>{contactDetails.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.linksSection}>
                        <div className={styles.linkColumn}>
                            <h3>Quick Links</h3>
                            <ul>
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h3>Website Development</h3>
                            <ul>
                                {webdevelopment.map((service, index) => (
                                    <li key={index}>
                                        <Link href={service.href}>{service.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h3>Account Management</h3>
                            <ul>
                                {accountmanagement.map((service, index) => (
                                    <li key={index}>
                                        <Link href={service.href}>{service.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        © {year} Anksquare. All rights reserved.
                    </div>
                    <div className={styles.social}>
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer