'use client'
import { useState, useEffect } from 'react'
import { FiX, FiCheck } from 'react-icons/fi'
import { services } from '@/json/services'
import styles from './GetQuotePopup.module.css'
import { supabase } from '@/supabase/supabase'

interface GetQuotePopupProps {
  isOpen: boolean
  onClose: () => void
  selectedService?: string
}

interface FormData {
  name: string
  phone: string
  service: string
}

const GetQuotePopup: React.FC<GetQuotePopupProps> = ({
  isOpen,
  onClose,
  selectedService
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: selectedService || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Lock body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Update service if selectedService changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }))
    }
  }, [selectedService])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            service: formData.service,
            status: 'pending'
          }
        ])

      if (error) throw error

      setSubmitted(true)

      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setFormData({
          name: '',
          phone: '',
          service: selectedService || '',
        })
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <FiCheck />
            </div>
            <h3>Thank You!</h3>
            <p>We&apos;ll get back to you shortly.</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Get a Quote</h2>
            <p className={styles.description}>
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="service">Service Required *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get Quote'}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default GetQuotePopup
