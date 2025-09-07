'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import Button from '@/custom/buttons/Button'
import HeroSvg from "../../../public/assets/svg/HeroSVG/HeroSVG"

import { FaShoppingCart, FaCode, FaChartLine, FaTools } from 'react-icons/fa'
import type { IconType } from 'react-icons'

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
              Empowering Your Digital Growth. Reach More with Seamless{' '}
              <span className={styles.highlight}> Digital Experience</span>
            </h1>
            <p className={styles.description}>
              We simplify digital commerce by building scalable web platforms and managing multi-channel merchant operations. From seamless storefronts to backend integrations, our solutions empower businesses to grow efficiently in today&apos;s competitive market.
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className={styles.cardSection}
        >
          {heroCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className={styles.card}
            >
              <div className={styles.cardIcon}>
                <card.icon size={32} />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Hero