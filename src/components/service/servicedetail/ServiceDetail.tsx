'use client'

import React, { FC, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'

import { services, ServiceItem } from '../../../json/services'
import Button from '@/custom/buttons/Button'
import styles from './ServiceDetail.module.css'

interface ServiceDetailProps {
  params: {
    slug: string
  }
}

const ServiceDetail: FC<ServiceDetailProps> = ({ params }) => {
  const slugPath = `/services/${params.slug}`

  const service = useMemo<ServiceItem | undefined>(
    () => services.find((s) => s.path === slugPath),
    [slugPath]
  )

  if (!service) {
    return (
      <section className={styles.notFound}>
        <div className={styles.container}>
          <p className={styles.errorMsg}>
            Sorry, we couldn’t find that service.
          </p>
          <Link href="/services" className={styles.backButton}>
            <FiArrowLeft /> Back to Services
          </Link>
        </div>
      </section>
    )
  }

  const processSteps = [
    { step: '01', title: 'Discovery', desc: 'Understanding your needs' },
    { step: '02', title: 'Strategy', desc: 'Planning the approach' },
    { step: '03', title: 'Implementation', desc: 'Executing the plan' },
    { step: '04', title: 'Support', desc: 'Ongoing assistance' },
  ]

  return (
    <section className={styles.serviceDetail}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          {/* <Link href="/services" className={styles.backButton}>
            <FiArrowLeft /> Back to Services
          </Link> */}
          <Button href='/services' variant='primary'><FiArrowLeft /> Back to Services</Button>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.description}>{service.description}</p>
        </motion.div>

        <div className={styles.content}>
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.mainContent}
          >
            <div className={styles.imageContainer}>
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={500}
                className={styles.mainImage}
                priority
              />
            </div>

            {/* Features */}
            <div className={styles.features}>
              <h2>What We Offer</h2>
              <div className={styles.featureGrid}>
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={`feature-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    className={styles.featureCard}
                  >
                    <span className={styles.checkIcon}>
                      <FiCheck />
                    </span>
                    <h3>{feature}</h3>
                    <p>
                      Comprehensive solutions tailored to your business needs
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className={styles.process}>
              <h2>Our Process</h2>
              <div className={styles.processSteps}>
                {processSteps.map((stepObj, idx) => (
                  <motion.div
                    key={`step-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                    className={styles.processStep}
                  >
                    <span className={styles.stepNumber}>
                      {stepObj.step}
                    </span>
                    <h3>{stepObj.title}</h3>
                    <p>{stepObj.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.sidebar}
          >
            <div className={styles.contactCard}>
              <h3>Ready to Get Started?</h3>
              <p>Let&apos;s discuss how we can help your business grow</p>
              <Button href="/contact" variant="primary" className={styles.contactButton}>
                Contact Us
              </Button>
            </div>

            <div className={styles.infoCard}>
              <h3>Why Choose Us</h3>
              <ul>
                <li>Expert Team</li>
                <li>Proven Track Record</li>
                <li>Custom Solutions</li>
                <li>Ongoing Support</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetail
