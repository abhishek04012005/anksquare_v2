"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from "./Clients.module.css";
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ClientLogo1 from '../../assets/client/jpmorgan.png';
import ClientLogo2 from '../../assets/client/gl.png';
import ClientLogo3 from '../../assets/client/dhootap.png';
import ClientLogo4 from '../../assets/client/indicame.png';
import ClientLogo5 from '../../assets/client/ishwarya.png';
import ClientLogo6 from '../../assets/client/mgm.png';
import ClientLogo7 from '../../assets/client/alkem.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import Heading from '@/custom/heading/Heading';

const clients = [
    {
        id: 1,
        name: 'Alkem',
        logo: ClientLogo7,
        project: 'Corporate Office Interior',
        testimonial: 'The team delivered a sleek, functional workspace that reflects our brand’s professionalism. Truly impressive execution.'
    },
    {
        id: 2,
        name: 'Galpha Laboratory',
        logo: ClientLogo2,
        project: 'Laboratory Infrastructure',
        testimonial: 'Precision and compliance were key, and they nailed both. Our lab setup is efficient, clean, and future-ready.'
    },
    {
        id: 3,
        name: 'Shree Dhootapapeshwar Ltd',
        logo: ClientLogo3,
        project: 'Ayurvedic Manufacturing Facility',
        testimonial: 'Their understanding of industrial needs and traditional aesthetics was remarkable. A seamless blend of heritage and utility.'
    },
    {
        id: 4,
        name: 'Indicame Health Care',
        logo: ClientLogo4,
        project: 'Healthcare Office Interior',
        testimonial: 'Smart layouts and calming design elements made our healthcare space both functional and welcoming. Highly recommended.'
    },
    {
        id: 5,
        name: 'Ishwarya Health Care Group',
        logo: ClientLogo5,
        project: 'Hospital Interior Design',
        testimonial: 'They created a healing environment with thoughtful design and durable materials. Patients and staff love the transformation.'
    },
    {
        id: 6,
        name: 'MGM Hospital',
        logo: ClientLogo6,
        project: 'Medical Facility Renovation',
        testimonial: 'From patient rooms to operation zones, every detail was handled with care. The result is a modern, efficient hospital space.'
    },
    {
        id: 7,
        name: 'JP Morgan',
        logo: ClientLogo1,
        project: 'Corporate Office Interior',
        testimonial: 'The team delivered a sleek, functional workspace that reflects our brand’s professionalism. Truly impressive execution.'
    },
];


const Clients = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className={styles.clientSection}>
            <div className={styles.container}>
                <Heading
                    subtitle='Clients'
                    title='Our'
                    titleHighlight='Clients'
                >
                </Heading>
                <div className={styles.sliderContainer}>
                    <button
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Previous slide"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Next slide"
                    >
                        <FaChevronRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        speed={1000}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className={styles.swiper}
                    >
                        {clients.map((client) => (
                            <SwiperSlide key={client.id}>
                                <div className={styles.clientCard}>
                                    <div className={styles.logoContainer}>
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            width={120}
                                            height={60}
                                            className={styles.clientLogo}
                                            priority
                                        />
                                    </div>
                                    <div className={styles.clientInfo}>
                                        <h3 className={styles.clientName}>{client.name}</h3>
                                        <p className={styles.projectType}>{client.project}</p>
                                        <div className={styles.testimonialWrapper}>
                                            <FaQuoteRight className={styles.quoteIcon} />
                                            <p className={styles.testimonial}>{client.testimonial}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Clients;