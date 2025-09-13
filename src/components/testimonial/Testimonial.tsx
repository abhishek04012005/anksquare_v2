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
    name: 'Virendra Bavarva',
    position: 'Terra Soil Clayart',
    image: './testimonial/male.png',
    quote:
      'Ank Square made our Amazon and Flipkart launch seamless. They handled account setup, product listings, and even guided us on pricing. Our online journey started strong.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sunil Kumar Kushwaha',
    position: 'SM ENTERPRISES',
    image: './testimonial/male.png',
    quote:
      'We were struggling with seller account issues until Ank Square stepped in. Their team took over operations, optimized our listings, and made everything run smoothly.',
    rating: 5
  },
  {
    id: 3,
    name: 'Shubham Walia',
    position: 'Evaware International',
    image: './testimonial/male.png',
    quote:
      'Managing multiple platforms was a challenge. Ank Square now handles our accounts across six marketplaces—keeping listings updated and operations hassle-free.',
    rating: 5
  },
  {
    id: 4,
    name: 'Atif Siddiqui',
    position: 'Maya All Care',
    image: './testimonial/male.png',
    quote:
      'Ank Square helped us onboard Blinkit and JioMart with ease. Their account management service is reliable, and they take care of everything from cataloging to logistics.',
    rating: 5
  },
  {
    id: 5,
    name: 'Abbas',
    position: 'Kaminomoto India',
    image: './testimonial/male.png',
    quote:
      'Thanks to Ank Square, our seller accounts are now professionally managed. They handle listings, updates, and platform coordination so we can focus on growing our brand.',
    rating: 5
  },
  {
    id: 6,
    name: 'Raj Aghara',
    position: 'Backbone Sanitaryware',
    image: './testimonial/male.png',
    quote:
      'We rely on Ank Square for complete account management across marketplaces. Their team ensures smooth operations, timely updates, and consistent support.',
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
