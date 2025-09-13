'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import Button from '@/custom/buttons/Button'
import HeroSvg from "../../custom/svg/HeroSVG/HeroSVG"
import { FaShoppingCart, FaCode, FaChartLine, FaTools } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import imageLoader from '../../../image-loader'
import Image from 'next/image'
import Link from 'next/link';
import { certificates, Certificate } from '../../json/certificates';



export interface HeroCard {
  id: number
  title: string
  icon: IconType
}

export const heroCards: HeroCard[] = [
  {
    id: 1,
    title: 'E-commerce Solutions',
    icon: FaShoppingCart
  },
  {
    id: 2,
    title: 'Web Development',
    icon: FaCode
  },
  {
    id: 3,
    title: 'Digital Growth',
    icon: FaChartLine
  },
  {
    id: 4,
    title: 'Technical Support',
    icon: FaTools
  }
]



const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className={styles.textContent}
          >
            <h1 className={styles.title}>
              Grow Your Online Business with Smart{' '}
              <span className={styles.highlight}>Marketplace Solutions</span>
            </h1>
            <p className={styles.description}>
              We help businesses sell their products online by taking care of their seller accounts on platforms like Amazon, Flipkart and Others. From setting up your account to improving your product listings and handling daily tasks—we manage it all so your business runs smoothly.
              We also build custom websites that match your brand and help you look professional online. Plus, we offer branding solutions to make your business stand out and be easily recognized.            </p>


            <div className={styles.cta}>
              <Button href="/services" variant="primary">
                Explore Our Solutions
              </Button>
              <Button href="/contact" variant="secondary">
                Get in Touch
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.imageContainer}
          >
            <div className={styles.imageWrapper}>
              <HeroSvg />
            </div>
          </motion.div>
        </div>

        <div className={styles.stats}>
          {[
            { number: '500+', text: 'Projects Completed' },
            { number: '300+', text: 'Happy Clients' },
            { number: '5+', text: 'Years Experience' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={styles.statItem}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statText}>{stat.text}</span>
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.certificateSection}
        >
          <h2 className={styles.certSectionTitle}>Work With Certified Partner Only</h2>
          <div className={styles.certContainer}>
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
                className={styles.certificateCard}
              >
                <div className={styles.certImageWrapper}>
                  <Image
                    loader={imageLoader}
                    src={cert.logo}
                    alt={cert.alt}
                    width={180}
                    height={90}
                    className={styles.certImage}
                  />
                </div>
                <div className={styles.certContent}>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.certDescription}>{cert.description}</p>
                  {cert.hasViewOption ? (
                    <Link
                      href={`/certificate/${cert.slug}`}
                      className={styles.viewCertButton}
                    >
                      View Certificate
                    </Link>
                  ) : (
                    <button
                      className={`${styles.viewCertButton} ${styles.disabled}`}
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero