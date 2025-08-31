"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from "./Clients.module.css";
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { clients } from '@/json/client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import Heading from '@/custom/heading/Heading';
import Button from '@/custom/buttons/Button';



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

                                    <div className={styles.ctaButton}>
                                        <Button className={styles.ctaButtonPrimary}
                                            variant='primary' href={`/client/${client.slug}`}>View Project
                                        </Button>
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