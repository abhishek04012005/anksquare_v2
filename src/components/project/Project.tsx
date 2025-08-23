'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Project.module.css'
import Heading from '@/custom/heading/Heading'
import Button from '@/custom/buttons/Button'

const workCategories = [
  {
    id: 'all',
    name: 'All Projects'
  },
  {
    id: 'business',
    name: 'Business'
  },
  {
    id: 'education',
    name: 'Education'
  },
  {
    id: 'events',
    name: 'Events'
  }
]

const workProjects = [
  {
    id: 1,
    title: 'Business Portfolio',
    category: 'business',
    image: '/work/business-portfolio.webp',
    description: 'Modern business portfolio website with dynamic features',
    link: '/work/business/portfolio'
  },
  {
    id: 2,
    title: 'Digital Resume Platform',
    category: 'education',
    image: '/work/digital-resume.webp',
    description: 'Interactive digital resume builder for professionals',
    link: '/work/education/resume'
  },
  {
    id: 3,
    title: 'Wedding Website',
    category: 'events',
    image: '/work/wedding-website.webp',
    description: 'Elegant wedding invitation and event management platform',
    link: '/work/events/wedding/website'
  },
]

const Project = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(workProjects)

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

  useEffect(() => {
    setFilteredProjects(
      activeCategory === 'all'
        ? workProjects
        : workProjects.filter(project => project.category === activeCategory)
    )
  }, [activeCategory])

  return (
      <section id="work-section" className={styles.work}>
        <div className={styles.container}>

          <Heading
            subtitle='Our Project'
            title='Featured'
            titleHighlight='Projects'
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.categories}
          >
            {workCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''
                  }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.projectGrid}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className={styles.projectCard}
              >
                <div className={styles.projectImage}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <Button href={project.link} variant='primary'>View Project</Button>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <span className={styles.projectCategory}>
                    {workCategories.find(cat => cat.id === project.category)?.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

export default Project