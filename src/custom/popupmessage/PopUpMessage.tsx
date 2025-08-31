'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi'
import styles from './Notification.module.css'

interface NotificationProps {
  type: 'success' | 'error'
  message: string
  isVisible: boolean
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${styles.notification} ${styles[type]}`}
        >
          <div className={styles.icon}>
            {type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
          </div>
          <p className={styles.message}>{message}</p>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close notification"
          >
            <FiX />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Notification