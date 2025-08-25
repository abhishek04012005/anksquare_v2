'use client'
import React, { useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules'
import { FiClock, FiUser } from 'react-icons/fi'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Blog.module.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Heading from '@/custom/heading/Heading'
import { blogPosts, BlogPost } from '../../json/blog'
import Button from '@/custom/buttons/Button';


interface BlogProps {
    isSlider?: boolean
}

const BlogCard = ({ post }: { post: BlogPost }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.blogCard}
        >
            <Link href={`/blog/${post.slug}`} className={styles.imageWrapper}>
                <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.image}
                />
                <span className={styles.category}>{post.category}</span>
            </Link>
            <div className={styles.content}>
                <Link href={`/blog/${post.slug}`}>
                    <h3 className={styles.title}>{post.title}</h3>
                </Link>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <FiUser className={styles.icon} />
                        <span>{post.author}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <FiClock className={styles.icon} />
                        <span>{post.readTime}</span>
                    </div>
                </div>
                {/* <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read More
                    <FaChevronRight className={styles.arrow} />
                </Link> */}
                <Button href={`/blog/${post.slug}`} variant='primary'>
                    Read More
                    <FaChevronRight className={styles.arrow} />
                </Button>
            </div>
        </motion.div>
    )
}

const Blog: React.FC<BlogProps> = ({ isSlider = true }) => {
    const swiperRef = useRef<SwiperType | null>(null);
    return (
        <section className={styles.blogSection}>
            <div className={styles.container}>


                <Heading
                    subtitle='Blogs'
                    title='Latest From Our'
                    titleHighlight='Blog'
                ></Heading>

                {isSlider ? (
                    <div className={styles.sliderContainer}>

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
                            {blogPosts.map((post) => (
                                <SwiperSlide key={post.id}>
                                    <BlogCard post={post} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            className={`${styles.navigationButton} ${styles.prevButton} prevButton`}
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Previous testimonial"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className={`${styles.navigationButton} ${styles.nextButton} nextButton`}
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Next testimonial"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                ) : (
                    <div className={styles.blogGrid}>
                        {blogPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Blog