'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import styles from './Footer.module.css'
import { socialLinks } from '@/json/ditviinfo'
import { contactDetails } from '@/json/ditviinfo'
import Logo from "../../assets/logo.png";


const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin/login' }
]

const services = [
    { name: 'Digital Identity', href: '/services/digital-identity' },
    { name: 'Branding', href: '/services/branding' },
    { name: 'Local SEO', href: '/services/seo' },
    { name: 'Social Media', href: '/services/social-media' },
    { name: 'Lead Generation', href: '/services/lead-generation' }
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
                                src={Logo}
                                alt="Ditvi Technologies"
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
                            <h3>Services</h3>
                            <ul>
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <Link href={service.href}>{service.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h3>Sitemap</h3>
                            <ul>
                                <li>
                                    <Link href="/contact">Sitemap</Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        © {year} Ditvi Technologies. All rights reserved.
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