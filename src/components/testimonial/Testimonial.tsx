'use client';

import React, { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
    FaQuoteLeft,
    FaStar,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Testimonial.module.css';
import Heading from '@/custom/heading/Heading';
import imageLoader from '../../../image-loader';

interface TestimonialItem {
    id: number;
    name: string;
    position: string;
    image: StaticImageData | string;
    quote: string;
    rating: number;
}

const testimonials: TestimonialItem[] = [
    {
        id: 1,
        name: 'Jaya J.',
        position: 'Founder, PureGlow Skincare',
        image: './testimonial/jaya.png',
        quote:
            'Ank Square helped us launch on Amazon and Flipkart with ease. Their team handled everything—from account setup to product listings—and our sales took off within weeks.',
        rating: 5
    },
    {
        id: 2,
        name: 'Ravi Khurana',
        position: 'Director, Khurana Electronics',
        image: './testimonial/male.png',
        quote:
            'We needed a professional website that could handle bulk orders and customer inquiries. Ank Square delivered a fast, clean site that’s easy to manage and looks great.',
        rating: 5
    },
    {
        id: 3,
        name: 'Sneha Joshi',
        position: 'Operations Head, Urban Threads',
        image: './testimonial/jaya.png',
        quote:
            'Their merchant account management service is top-notch. We now sell on six platforms and Ank Square keeps everything running smoothly—from listings to logistics.',
        rating: 5
    },
    {
        id: 4,
        name: 'Manish Verma',
        position: 'Co-founder, FreshBasket',
        image: './testimonial/male.png',
        quote:
            'Ank Square built our e-commerce site and helped us go live on Blinkit and JioMart. Their support is reliable, and they really understand how online selling works.',
        rating: 5
    }
]


const Testimonial: React.FC = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className={styles.testimonialSection}>
            <div className={styles.container}>


                <Heading
                    subtitle='Testimonials'
                    title='What Our Clients'
                    titleHighlight='Say'
                ></Heading>

                <div className={styles.sliderContainer}>
                    <button
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Previous testimonial"
                        type="button"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Next testimonial"
                        type="button"
                    >
                        <FaChevronRight />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop
                        speed={1000}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 }
                        }}
                        className={styles.swiper}
                    >
                        {testimonials.map((t) => (
                            <SwiperSlide key={t.id}>
                                <article className={styles.testimonialCard}>
                                    <FaQuoteLeft className={styles.quoteIcon} />
                                    <p className={styles.quote}>{t.quote}</p>

                                    <div className={styles.rating}>
                                        {Array.from({ length: t.rating }, (_, i) => (
                                            <FaStar key={i} className={styles.star} />
                                        ))}
                                    </div>

                                    <div className={styles.clientInfo}>
                                        <div className={styles.clientImage}>
                                            <Image
                                                loader={imageLoader}
                                                src={t.image}
                                                alt={t.name}
                                                width={60}
                                                height={60}
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.clientDetails}>
                                            <h4 className={styles.clientName}>{t.name}</h4>
                                            <p className={styles.clientPosition}>
                                                {t.position}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
