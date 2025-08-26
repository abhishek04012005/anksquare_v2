'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import styles from './Contact.module.css'
import Heading from '@/custom/heading/Heading'
import { contactDetails } from '@/json/ditviinfo'
import { supabase } from '@/supabase/supabase'

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
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
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="number"
                                placeholder="Your Number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                            />
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