'use client'
import { ReactNode } from 'react'
import styles from './Background.module.css'

interface BackgroundPatternProps {
  children: ReactNode
  variant?: 'waves' | 'geometric' | 'circles'
  className?: string
}

const BackgroundPattern = ({
  children,
  variant = 'waves',
  className = ''
}: BackgroundPatternProps) => {
  return (
    <div className={`${styles.wrapper} ${styles[variant]} ${className}`}>
      <div className={styles.patterns}>
        <div className={styles.pattern1}></div>
        <div className={styles.pattern2}></div>
        <div className={styles.pattern3}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default BackgroundPattern