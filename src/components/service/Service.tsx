'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Service.module.css'
import Heading from '@/custom/heading/Heading'
import Button from '@/custom/buttons/Button'
import ServImage1 from "../../assets/services/serv1.jpg"
import ServImage2 from "../../assets/services/serv2.jpg"
import ServImage3 from "../../assets/services/serv3.jpg"
import ServImage4 from "../../assets/services/serv4.jpg"
import ServImage5 from "../../assets/services/serv5.jpg"
import ServImage6 from "../../assets/services/serv6.jpg"
import ServImage7 from "../../assets/services/serv7.jpg"

import type { StaticImageData } from 'next/image'

interface ServiceItem {
    id: number
    title: string
    description: string
    features: string[]
    image: string | StaticImageData
    path: string
}

interface ServiceCardProps {
    service: ServiceItem
    isReversed: boolean
    index: number
}

const services: ServiceItem[] = [
    {
        id: 1,
        title: 'Core Digital Identity Services',
        description: 'Create a powerful digital presence with custom websites, mobile apps, and digital solutions that reflect your brand identity.',
        features: [
            'Custom Website Development',
            'Mobile App Development',
            'Digital Platform Integration',
            'E-commerce Solutions',
            'User Experience Design'
        ],
        image: ServImage1,
        path: '/services/digital-identity'
    },
    {
        id: 2,
        title: 'Branding & Print Collateral',
        description: 'Build a cohesive brand identity with professional design services that make your business stand out in the market.',
        features: [
            'Logo & Brand Design',
            'Business Cards & Stationery',
            'Marketing Materials',
            'Print Media Design',
            'Brand Guidelines'
        ],
        image: ServImage2,
        path: '/services/branding'
    },
    {
        id: 3,
        title: 'Local SEO & Online Presence',
        description: 'Boost your local visibility and attract more customers with our comprehensive SEO and online presence management services.',
        features: [
            'Local SEO Optimization',
            'Google My Business Management',
            'Online Directory Listings',
            'Review Management',
            'Local Content Strategy'
        ],
        image: ServImage3,
        path: '/services/seo'
    },
    {
        id: 4,
        title: 'Social Media & Communication',
        description: 'Engage your audience and build lasting relationships through effective social media strategies and communication.',
        features: [
            'Social Media Management',
            'Content Creation',
            'Community Engagement',
            'Social Media Analytics',
            'Campaign Management'
        ],
        image: ServImage4,
        path: '/services/social-media'
    },
    {
        id: 5,
        title: 'Lead Generation & Automation',
        description: 'Streamline your business growth with automated lead generation and nurturing systems that convert prospects into customers.',
        features: [
            'Marketing Automation',
            'Lead Capture Systems',
            'Email Marketing',
            'CRM Integration',
            'Sales Funnel Optimization'
        ],
        image: ServImage5,
        path: '/services/lead-gn'
    },
    {
        id: 6,
        title: 'Visual & Multimedia Services',
        description: 'Captivate your audience with stunning visual content and multimedia experiences that tell your brand story.',
        features: [
            'Video Production',
            'Photography Services',
            'Animation Design',
            'Virtual Tours',
            'Interactive Media'
        ],
        image: ServImage6,
        path: '/services/multimedia'
    },
    {
        id: 7,
        title: 'Education & Support',
        description: 'Empower your team with comprehensive training and ongoing support to maximize your digital investments.',
        features: [
            'Training Workshops',
            'Technical Support',
            'Digital Consultation',
            'Resource Library',
            'Maintenance Services'
        ],
        image: ServImage7,
        path: '/services/education'
    }
]

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isReversed, index }) => {
    const controls = useAnimation()
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    })

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.2
            }
        }
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className={`${styles.serviceCard} ${isReversed ? styles.reversed : ''}`}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className={styles.serviceImage}
                    priority={index < 2}
                />
                <div className={styles.imageBg}></div>
            </div>

            <div className={styles.contentContainer}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.featureList}>
                    {service.features.map((feature, idx) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={controls}
                            variants={{
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: 0.3 + idx * 0.1 }
                                }
                            }}
                        >
                            <span className={styles.bullet}>•</span>
                            {feature}
                        </motion.li>
                    ))}
                </ul>
                <div className={styles.cta}>
                    <Button href={service.path} className={styles.buttonItem} variant='primary'>View More</Button>
                    <Button href={service.path} className={styles.buttonItem} variant='secondary'>Get Quote</Button>
                </div>
            </div>
        </motion.div>
    )
}

const Services: React.FC = () => {
    return (
        <section className={styles.services} id="services">
            <div className={styles.container}>
                <Heading
                    subtitle='Our Services'
                    title='Empowering Your'
                    titleHighlight='Digital Growth'
                ></Heading>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            isReversed={index % 2 !== 0}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services