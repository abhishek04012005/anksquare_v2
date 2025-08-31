'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import styles from './Contact.module.css'
import Heading from '@/custom/heading/Heading'
import { contactDetails } from '@/json/ditviinfo'
import { supabase } from '@/lib/supabase'

const contactInfo = [
    {
        icon: <FiMail />,
        title: 'Email Us',
        content: contactDetails.email,
        link: `mailto:${contactDetails.email}`
    },
    {
        icon: <FiPhone />,
        title: 'Call Us',
        content: contactDetails.number,
        link: `tel:${contactDetails.number}`
    },
    {
        icon: <FiMapPin />,
        title: 'Visit Us',
        content: contactDetails.address,
        link: 'https://maps.google.com'
    }
]

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    // Add validation state
    const [errors, setErrors] = useState({
        name: '',
        number: ''
    })

    // Update handleChange function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        // Validation for name field - only alphabets and spaces
        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                setErrors(prev => ({
                    ...prev,
                    name: 'Please enter alphabets only'
                }))
                return
            } else {
                setErrors(prev => ({
                    ...prev,
                    name: ''
                }))
            }
        }

        // Validation for phone number
        if (name === 'number') {
            // Check if starts with valid digits and has correct length
            if (!/^[6-9]\d{0,9}$/.test(value)) {
                setErrors(prev => ({
                    ...prev,
                    number: 'Enter valid 10-digit number starting with 6-9'
                }))
                // Allow input only if it's empty or matches pattern
                if (value && !/^[6-9]\d*$/.test(value)) {
                    return
                }
            } else {
                setErrors(prev => ({
                    ...prev,
                    number: ''
                }))
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        number: formData.number,
                        subject: formData.subject,
                        message: formData.message,
                        status: 'new'
                    }
                ])

            if (error) throw error

            // Reset form
            setFormData({ name: '', number: '', subject: '', message: '' })
            // Show success message (implement your own notification system)
        } catch (error) {
            console.error('Error submitting form:', error)
            // Show error message
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <section className={styles.contact}>
            <div className={styles.container}>
                <Heading
                    title='Get in Touch'
                    subtitle='Let&apos;s Connect'
                    titleHighlight='Together'
                ></Heading>

                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.contactInfo}
                    >
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.infoCard}
                            >
                                <div className={styles.iconWrapper}>{info.icon}</div>
                                <div className={styles.infoContent}>
                                    <h3>{info.title}</h3>
                                    <p>{info.content}</p>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                pattern="[A-Za-z\s]+"
                                title="Please enter alphabets only"
                            />
                            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="tel"
                                name="number"
                                placeholder="Your Number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                                pattern="[6-9][0-9]{9}"
                                maxLength={10}
                                title="Please enter a valid 10-digit number starting with 6-9"
                            />
                            {errors.number && <span className={styles.errorText}>{errors.number}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}

export default Contact