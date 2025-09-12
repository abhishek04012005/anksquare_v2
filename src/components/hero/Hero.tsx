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

// Add these after the existing heroCards array

interface Certificate {
  id: number;
  title: string;
  image: string;
  alt: string;
  description: string;
}


export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Flipkart Partner',
    image: './services/flipkart.png',
    alt: 'Flipkart Certified Partner',
    description: 'Start Your Ecommerce business today with Flipkart Partner'
  },
  {
    id: 2,
    title: 'Amazon ATES Partner',
    image: './services/amazon.png',
    alt: 'Amazon ATES Certified Partner',
    description: 'Start Your ecommerce business with Certified ATES Amazon Partner'
  },
  {
    id: 3,
    title: 'JioMart Partner',
    image: './services/jiomart.png',
    alt: 'JioMart Certified Partner',
    description: 'Start your ecommerce business today with JioMart Partner'
  },
  {
    id: 4,
    title: 'Meesho Partner',
    image: './services/meesho.png',
    alt: 'Meesho Certified Partner',
    description: 'Start your ecommerce business today with Meesho Partner'
  }
];


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
              Grow Your Business Online with Smart{' '}
              <span className={styles.highlight}>Website & Marketplace Solutions</span>
            </h1>
            <p className={styles.description}>
              We help you sell online with ease. From building professional websites to setting up and managing your seller accounts on platforms like Amazon and Flipkart, we make sure your business runs smoothly and reaches more customers.
            </p>


            <div className={styles.cta}>
              <Button href="/services" variant="primary">
                Explore Our Work
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
            { number: '100+', text: 'Happy Clients' },
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
          <h2 className={styles.certSectionTitle}>Work With Certfied Partner Only</h2>
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
                    src={cert.image}
                    alt={cert.alt}
                    width={180}
                    height={90}
                    className={styles.certImage}
                  />
                </div>
                <div className={styles.certContent}>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.certDescription}>{cert.description}</p>
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