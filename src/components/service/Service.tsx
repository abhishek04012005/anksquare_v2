'use client'
import { useState, FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Service.module.css'
import Button from '@/custom/buttons/Button'
import GetQuotePopup from '@/custom/getquotepopup/GetQuotePopup'
import { mainServices, marketplaceServices, websiteTypes } from '../../json/services'

import { StaticImageData } from 'next/image';
import Heading from '@/custom/heading/Heading'

interface MainServiceProps {
    service: {
        image: FC;
        title: string;
        description: string;
        features: string[];
        path: string;
    };
    isReversed: boolean;
}

const MainService = ({ service, isReversed }: MainServiceProps) => {
    const [showQuote, setShowQuote] = useState(false)

    return (
        <div className={`${styles.mainService} ${isReversed ? styles.reversed : ''}`}>
            <motion.div
                className={styles.imageSection}
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <service.image />
            </motion.div>

            <motion.div
                className={styles.contentSection}
                initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h2 className={styles.mainTitle}>{service.title}</h2>
                <p className={styles.mainDescription}>{service.description}</p>
                <ul className={styles.mainFeatures}>
                    {service.features.map((feature, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {feature}
                        </motion.li>
                    ))}
                </ul>
                <div className={styles.mainButtons}>
                    <Button href={service.path} variant="primary">View More</Button>
                    <Button onClick={() => setShowQuote(true)} variant="secondary">Get Quote</Button>
                </div>
            </motion.div>

            <GetQuotePopup
                isOpen={showQuote}
                onClose={() => setShowQuote(false)}
                selectedService={service.title}
            />
        </div>
    )
}

interface SubService {
    logo: string | StaticImageData;
    title: string;
    features: string[];
    path: string;
    id: string | number;
}

const SubServiceCard = ({ service }: { service: SubService }) => {
    return (
        <motion.div
            className={styles.subCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            <div className={styles.logoContainer}>
                <Image
                    src={service.logo}
                    alt={service.title}
                    className={styles.serviceLogo}
                />
            </div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <ul className={styles.cardFeatures}>
                {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <Button href={service.path} variant="primary" className={styles.viewDetails}>
                View Details
            </Button>
        </motion.div>
    )
}

const Services = () => {
    return (
        <section className={styles.servicesSection}>
            <div className={styles.container}>
                <Heading
                    subtitle="Services"
                    title="End-to-End Ecommerce Solutions Powered By"
                    titleHighlight="Digital Expertise"
                />

                {mainServices.map((service, index) => (
                    <div key={service.id} className={styles.serviceBlock}>
                        <MainService
                            service={service}
                            isReversed={index % 2 !== 0}
                        />

                        <div className={styles.subServices}>
                            <h2 className={styles.subTitle}>
                                {index === 0 ? 'Marketplace Solutions' : 'Website Solutions'}
                            </h2>
                            <div className={styles.cardGrid}>
                                {index === 0
                                    ? marketplaceServices.map(service => (
                                        <SubServiceCard key={service.id} service={service} />
                                    ))
                                    : websiteTypes.map(service => (
                                        <SubServiceCard key={service.id} service={service} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services