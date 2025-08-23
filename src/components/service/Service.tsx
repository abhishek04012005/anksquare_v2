'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    FiMonitor,
    FiPenTool,
    FiSearch,
    FiShare2,
    FiTarget,
    FiVideo,
    FiBook
} from 'react-icons/fi'
import styles from './Service.module.css'
import Heading from '@/custom/heading/Heading'

const services = [
    {
        id: 1,
        icon: <FiMonitor />,
        title: 'Core Digital Identity Services',
        description: 'Create a strong online presence with custom websites, mobile apps, and digital solutions.',
        features: ['Custom Website Development', 'Mobile App Development', 'Digital Platform Integration']
    },
    {
        id: 2,
        icon: <FiPenTool />,
        title: 'Branding & Print Collateral',
        description: 'Build a memorable brand identity with professional design and print materials.',
        features: ['Logo Design', 'Business Cards', 'Marketing Materials']
    },
    {
        id: 3,
        icon: <FiSearch />,
        title: 'Local SEO & Online Presence',
        description: 'Improve your local visibility and attract more customers through SEO.',
        features: ['Local SEO Optimization', 'Google My Business', 'Online Directory Management']
    },
    {
        id: 4,
        icon: <FiShare2 />,
        title: 'Social Media & Communication',
        description: 'Engage your audience through effective social media strategies.',
        features: ['Social Media Management', 'Content Creation', 'Community Engagement']
    },
    {
        id: 5,
        icon: <FiTarget />,
        title: 'Lead Generation & Automation',
        description: 'Generate and nurture leads with automated marketing solutions.',
        features: ['Marketing Automation', 'Lead Capture', 'Email Marketing']
    },
    {
        id: 6,
        icon: <FiVideo />,
        title: 'Visual & Multimedia Services',
        description: 'Create engaging visual content for your brand.',
        features: ['Video Production', 'Photography', 'Animation']
    },
    {
        id: 7,
        icon: <FiBook />,
        title: 'Education & Support',
        description: 'Get expert guidance and support for your digital journey.',
        features: ['Training Sessions', 'Technical Support', 'Digital Consultation']
    }
]

const Services = () => {
    const [activeService, setActiveService] = useState(1)

    return (
        <section className={styles.services}>
            <div className={styles.container}>

                <Heading
                    subtitle='Our Services'
                    title='Empowering Your'
                    titleHighlight='Digital Growth'
                ></Heading>

                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.serviceList}
                    >
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className={`${styles.serviceItem} ${activeService === service.id ? styles.active : ''
                                    }`}
                                onClick={() => setActiveService(service.id)}
                            >
                                <div className={styles.iconWrapper}>{service.icon}</div>
                                <h3>{service.title}</h3>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={styles.serviceDetails}
                    >
                        {services.map((service) => (
                            service.id === activeService && (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className={styles.detailContent}
                                >
                                    <div className={styles.detailHeader}>
                                        <div className={styles.largeIcon}>{service.icon}</div>
                                        <h3>{service.title}</h3>
                                    </div>
                                    <p>{service.description}</p>
                                    <ul className={styles.featureList}>
                                        {service.features.map((feature, index) => (
                                            <li key={index}>
                                                <span className={styles.bullet}>•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Services