'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Service.module.css'
import Heading from '@/custom/heading/Heading'
import Button from '@/custom/buttons/Button'
import { services, ServiceItem } from '../../json/services'
import GetQuotePopup from '@/custom/getquotepopup/GetQuotePopup'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/autoplay'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ServiceCardProps {
    service: ServiceItem
    isReversed: boolean
    index: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isReversed, index }) => {
    const [showQuotePopup, setShowQuotePopup] = useState(false)

    const controls = useAnimation()
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    })

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            // transition: {
            //     duration: 0.6,
            //     delay: index * 0.2
            // }
        }
    }

    return (
        <>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className={`${styles.serviceCard} ${isReversed ? styles.reversed : ''}`}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src={service.image}
                        alt={service.title}
                        width={600}
                        height={400}
                        className={styles.serviceImage}
                        priority={index < 2}
                    />
                    <div className={styles.imageBg}></div>
                </div>

                <div className={styles.contentContainer}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    <ul className={styles.featureList}>
                        {service.features.map((feature, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={controls}
                                variants={{
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        // transition: { delay: 0.3 + idx * 0.1 }
                                    }
                                }}
                            >
                                <span className={styles.bullet}>•</span>
                                {feature}
                            </motion.li>
                        ))}
                    </ul>
                    <div className={styles.cta}>
                        <Button href={service.path} className={styles.buttonItem} variant='primary'>View More</Button>
                        <Button onClick={() => setShowQuotePopup(true)} className={styles.buttonItem} variant='secondary'>Get Quote</Button>
                    </div>
                </div>
            </motion.div>
            <GetQuotePopup
                isOpen={showQuotePopup}
                onClose={() => setShowQuotePopup(false)}
                selectedService={service.title}
            />
        </>
    )
}

const Services: React.FC = () => {
    const beforeSliderServices = services.filter(service => !service.isSlider && service.id < 10)
    const sliderServices = services.filter(service => service.isSlider)
    const afterSliderServices = services.filter(service => service.id === 10)

    return (
        <section className={styles.services} id="services">
            <div className={styles.container}>
                <Heading
                    subtitle='Our Services'
                    title='Empowering Your'
                    titleHighlight='Digital Growth'
                />

                <div className={styles.servicesGrid}>
                    {/* Regular services before slider */}
                    {beforeSliderServices.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            isReversed={index % 2 !== 0}
                            index={index}
                        />
                    ))}

                    {/* Slider services */}
                    {sliderServices.length > 0 && (
                        <div className={styles.sliderContainer}>
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={30}
                                slidesPerView={3}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }}
                                loop={true}
                                className={styles.swiper}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 20
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 25
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30
                                    }
                                }}
                            >
                                {sliderServices.map((service, index) => (
                                    <SwiperSlide key={service.id}>
                                        <div className={styles.sliderCard}>
                                            <ServiceCard
                                                service={service}
                                                isReversed={false}
                                                index={index + beforeSliderServices.length}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    {/* Service with ID 10 after slider */}
                    {afterSliderServices.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            isReversed={index % 2 !== 0}
                            index={index + beforeSliderServices.length + sliderServices.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Services