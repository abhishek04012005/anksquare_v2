'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './SubServiceDetail.module.css';
import Button from '@/custom/buttons/Button';
import Heading from '@/custom/heading/Heading';
import { useState } from 'react';
import GetQuotePopup from '@/custom/getquotepopup/GetQuotePopup';
import { SubService } from '@/json/services';
import imageLoader from '../../../../image-loader';

interface ServiceDetailProps {
    service: SubService;
    city?: string;
}

const SubServiceDetail = ({ service, city }: ServiceDetailProps) => {
    const [showQuote, setShowQuote] = useState(false);
    const isWebsiteService = service.slug.includes('website');


    return (
        <div className={styles.serviceDetail}>
            <div className={styles.hero}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.heroContent}
                    >
                        <div className={styles.logoWrapper}>
                            <Image
                                loader={imageLoader}
                                src={service.logo}
                                alt={service.title}
                                className={styles.serviceLogo}
                                height={80}
                                width={80}
                            />
                        </div>
                        <h1 className={styles.title}>
                            {city ? `${service.title}` : service.title}
                        </h1>
                        <p className={styles.overview}>
                            {isWebsiteService
                                ? `Professional ${service.title.toLowerCase()} development services in ${city}. ${service.details.overview}`
                                : `Expert ${service.title} services in ${city}. ${service.details.overview}`
                            }
                        </p>
                        <Button onClick={() => setShowQuote(true)} variant="primary">
                            Get Started
                        </Button>
                    </motion.div>
                </div>
            </div>

            <div className={styles.container}>
                <section className={styles.benefits}>
                    <Heading
                        subtitle="Benefits"
                        title="Why Choose Our"
                        titleHighlight={`${service.title} Service`}
                    />
                    <div className={styles.benefitsGrid}>
                        {service.details.benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className={styles.benefitCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className={styles.process}>
                    <Heading
                        subtitle="Process"
                        title="How We"
                        titleHighlight="Work"
                    />
                    <div className={styles.processSteps}>
                        {service.details.process.map((step, index) => (
                            <motion.div
                                key={index}
                                className={styles.processStep}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.stepNumber}>{step.step}</div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className={styles.faq}>
                    <Heading
                        subtitle="FAQ"
                        title="Frequently Asked"
                        titleHighlight="Questions"
                    />
                    <div className={styles.faqGrid}>
                        {service.details.faq.map((item, index) => (
                            <motion.div
                                key={index}
                                className={styles.faqItem}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3>{item.question}</h3>
                                <p>{item.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            <GetQuotePopup
                isOpen={showQuote}
                onClose={() => setShowQuote(false)}
                selectedService={service.title}
            />
        </div>
    );
};

export default SubServiceDetail;