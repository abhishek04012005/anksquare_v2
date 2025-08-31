'use client'
import React, { FC, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaGlobe, FaImage, FaIdCard, FaFile, FaChartLine } from 'react-icons/fa'
import { clients, Client } from '@/json/client'
import styles from './ProjectView.module.css'


interface ProjectViewProps {
  slug: string
}

const workTypeIcons = {
  all: FaImage,
  logo: FaImage,
  website: FaGlobe,
  visitingCard: FaIdCard,
  profile: FaFile,
  business: FaChartLine,
  letterHead: FaFile
}

const ProjectView: FC<ProjectViewProps> = ({ slug }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null)


  const client = useMemo<Client | undefined>(
    () => clients.find((c) => c.slug === slug),
    [slug]
  )

  if (!client) return <div>Project not found</div>

  const filteredWork = client.workDone.filter(work =>
    !selectedType || work.type === selectedType
  )

  return (
    <section className={styles.projectView}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.clientInfo}>
            <Image
              src={client.logo}
              alt={client.name}
              width={180}
              height={90}
              className={styles.logo}
            />
            <div>
              <h1 className={styles.title}>{client.name}</h1>
              <p className={styles.project}>{client.project}</p>
            </div>
          </div>
          <blockquote className={styles.testimonial}>
            {client.testimonial}
          </blockquote>
        </div>

        <div className={styles.workTypes}>
          {Array.from(new Set(client.workDone.map(w => w.type))).map(type => {
            const Icon = workTypeIcons[type as keyof typeof workTypeIcons]
            return (
              <button
                key={type}
                className={`${styles.typeButton} ${selectedType === type ? styles.active : ''
                  }`}
                onClick={() => setSelectedType(type)}
              >
                <Icon />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </button>
            )
          })}
        </div>

        <div className={styles.workGrid}>
          {filteredWork.map((work, index) => (
            <motion.div
              key={work.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={styles.workCard}
            >
              <h3 className={styles.workTitle}>{work.title}</h3>
              <p className={styles.description}>{work.description}</p>

              {work.images && (
                <div className={styles.imageGrid}>
                  {work.images.map((image, i) => (
                    <div key={i} className={styles.imageContainer}>
                      <Image
                        src={image}
                        alt={`${work.title} ${i + 1}`}
                        width={1000}
                        height={900}
                        className={styles.workImage}
                      />
                      <div className={styles.imageControls}>
                        <a
                          href={image.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.imageButton}
                          title="Open in New Tab"
                        >
                          <FaImage />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaGlobe />
                  <span>Visit Website</span>
                </a>
              )}

              {work.presentationUrl && (
                <div className={styles.presentation}>
                  <iframe
                    src={work.presentationUrl}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    allowFullScreen
                    title={`${client.name} Presentation`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectView