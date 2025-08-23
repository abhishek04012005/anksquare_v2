'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import Button from '@/custom/buttons/Button'

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
              Transform Your Vision Into
              <span className={styles.highlight}> Digital Reality</span>
            </h1>
            <p className={styles.description}>
              We create stunning digital solutions for businesses, education, and events.
              From websites to digital cards, we bring your ideas to life.
            </p>
            <div className={styles.cta}>
              <Button href="/work" variant="primary">
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
              <div className={styles.shapes}>
                <div className={`${styles.shape} ${styles.shape1}`}></div>
                <div className={`${styles.shape} ${styles.shape2}`}></div>
                <div className={`${styles.shape} ${styles.shape3}`}></div>
              </div>
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
      </div>
    </section>
  )
}

export default Hero