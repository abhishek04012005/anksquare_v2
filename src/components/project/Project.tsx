'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Project.module.css'
import Heading from '@/custom/heading/Heading'
import Button from '@/custom/buttons/Button'
import { clients } from '@/json/client'
import { projectCategories } from '@/json/project'
import imageLoader from '../../../image-loader'

const Project = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const workSection = document.getElementById('work-section')
    if (workSection) {
      observer.observe(workSection)
    }

    return () => {
      if (workSection) {
        observer.unobserve(workSection)
      }
    }
  }, [])

  const filteredWorks = clients.flatMap(client =>
    client.workDone
      .filter(work => activeCategory === 'all' || work.type === activeCategory)
      .map(work => ({
        ...work,
        clientName: client.name,
        clientSlug: client.slug,
        clientLogo: client.logo
      }))
  )

  return (
    <section id="work-section" className={styles.work}>
      <div className={styles.container}>
        <Heading
          subtitle='Our Portfolio'
          title='Recent'
          titleHighlight='Work'
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className={styles.categories}
        >
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.active : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.projectGrid}
          >
            {filteredWorks.map((work, index) => (
              <motion.div
                key={`${work.clientSlug}-${work.type}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.projectCard}
              >
                <div className={styles.projectImage}>
                  {work.images?.[0] && (
                    <Image
                      loader={imageLoader}
                      src={work.images[0]}
                      alt={work.title}
                      width={400}
                      height={300}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.overlay}>
                    {work.url && (
                      <Button href={work.url} variant='primary'>
                        View Live
                      </Button>
                    )}
                    {work.presentationUrl && (
                      <Button href={work.presentationUrl} variant='secondary'>
                        View Presentation
                      </Button>
                    )}
                  </div>
                </div>

                <div className={styles.projectInfo}>
                  <div className={styles.clientInfo}>
                    <Image
                      loader={imageLoader}
                      src={work.clientLogo}
                      alt={work.clientName}
                      width={40}
                      height={40}
                      className={styles.clientLogo}
                    />
                    <span className={styles.clientName}>{work.clientName}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{work.title}</h3>
                  <p className={styles.projectDescription}>{work.description}</p>
                  <span className={styles.projectCategory}>
                    {projectCategories.find(cat => cat.id === work.type)?.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Project