'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './About.module.css'
import Heading from '@/custom/heading/Heading'
import Button from '@/custom/buttons/Button'
import { features } from '../../json/about'
import AboutSVG from "../../../public/assets/svg/AboutSVG/AboutSVG"



const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section className={styles.about} ref={ref}>
      <div className={styles.container}>
        <Heading
          subtitle="About Us"
          title="Empowering Ecommerce Through"
          titleHighlight="Digital Expertise"
        />


        <div className={styles.content}>
          <motion.div
            className={styles.imageSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.imageBorder}>
              <AboutSVG />
            </div>
            <div className={styles.experience}>
              <span className={styles.number}>5+</span>
              <span className={styles.text}>Years of Excellence</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.textSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className={styles.description}>
              At Anksquare, we blend creativity with technology to deliver
              exceptional digital solutions. Our passionate team is dedicated to
              transforming your ideas into impressive digital realities.
            </p>

            <div className={styles.features}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={styles.featureItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.cta}>
              <Button href="/contact" variant="primary">
                Let&apos;s Work Together
              </Button>
              <Button href="/services" variant="secondary">
                View Our Portfolio
              </Button>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About