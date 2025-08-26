'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiCalendar, FiUsers, FiTag } from 'react-icons/fi'
import { workProjects } from '../../../json/project'
import styles from './ProjectDetail.module.css'
import { StaticImageData } from 'next/image'

interface ProjectDetailProps {
  params: {
    slug: string
  }
}

// Extended project details
interface ProjectDetails {
  id: number
  title: string
  category: string
  image: StaticImageData
  description: string
  link: string
  fullDescription: string
  technologies: string[]
  client: string
  duration: string
  team: string
  challenges: string[]
  solutions: string[]
  results: string[]
  images: string[]
  githubLink?: string
  liveLink?: string
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ params }) => {
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<typeof workProjects>([])

  useEffect(() => {
    // In a real app, fetch project details from API
    const currentProject = {
      ...workProjects.find(p => p.link.includes(params.slug)),
      fullDescription: 'Detailed description of the project goes here...',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      client: 'Client Name',
      duration: '3 months',
      team: '4 members',
      challenges: [
        'Complex user interface requirements',
        'Performance optimization needs',
        'Mobile responsiveness'
      ],
      solutions: [
        'Implemented component-based architecture',
        'Used lazy loading and code splitting',
        'Adopted mobile-first approach'
      ],
      results: [
        '40% increase in user engagement',
        '50% faster load times',
        'Improved mobile conversion rates'
      ],
      images: ['/projects/detail1.jpg', '/projects/detail2.jpg', '/projects/detail3.jpg'],
      githubLink: 'https://github.com/project',
      liveLink: 'https://project-demo.com'
    } as ProjectDetails

    if (currentProject) {
      setProject(currentProject)
      // Find related projects in same category
      const related = workProjects
        .filter(p => p.category === currentProject.category && p.id !== currentProject.id)
        .slice(0, 2)
      setRelatedProjects(related)
    }
  }, [params.slug])

  if (!project) return null

  return (
    <article className={styles.projectDetail}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <div className={styles.breadcrumb}>
            <Link href="/projects">Projects</Link> / <span>{project.category}</span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.projectMeta}>
            <div className={styles.metaItem}>
              <FiCalendar className={styles.icon} />
              <span>Duration: {project.duration}</span>
            </div>
            <div className={styles.metaItem}>
              <FiUsers className={styles.icon} />
              <span>Team: {project.team}</span>
            </div>
            <div className={styles.metaItem}>
              <FiTag className={styles.icon} />
              <span>Category: {project.category}</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.mainContent}
          >
            <div className={styles.showcase}>
              <div className={styles.mainImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={675}
                  priority
                  className={styles.image}
                />
              </div>
              <div className={styles.imageGrid}>
                {project.images.map((img, index) => (
                  <div key={index} className={styles.thumbnailWrapper}>
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={400}
                      height={225}
                      className={styles.thumbnail}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.projectInfo}>
              <section className={styles.section}>
                <h2>Project Overview</h2>
                <p>{project.fullDescription}</p>
              </section>

              <section className={styles.section}>
                <h2>Challenges & Solutions</h2>
                <div className={styles.challengeSolution}>
                  <div className={styles.challenges}>
                    <h3>Challenges</h3>
                    <ul>
                      {project.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.solutions}>
                    <h3>Solutions</h3>
                    <ul>
                      {project.solutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2>Results & Impact</h2>
                <div className={styles.results}>
                  {project.results.map((result, index) => (
                    <div key={index} className={styles.resultCard}>
                      {result}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.sidebar}
          >
            <div className={styles.techStack}>
              <h3>Technologies Used</h3>
              <div className={styles.tags}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.tag}>{tech}</span>
                ))}
              </div>
            </div>

            <div className={styles.projectLinks}>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  <FiExternalLink /> View Live Site
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  <FiGithub /> View Source Code
                </a>
              )}
            </div>

            <div className={styles.relatedProjects}>
              <h3>Related Projects</h3>
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  href={related.link}
                  className={styles.relatedProject}
                >
                  <Image
                    src={related.image}
                    alt={related.title}
                    width={100}
                    height={60}
                    className={styles.relatedImage}
                  />
                  <div className={styles.relatedInfo}>
                    <h4>{related.title}</h4>
                    <span>{related.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </article>
  )
}

export default ProjectDetail