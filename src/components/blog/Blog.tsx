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

interface BlogPost {
    id: number
    title: string
    excerpt: string
    content: string
    image: string
    author: string
    date: string
    readTime: string
    category: string
    slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Digital Marketing in 2024',
    excerpt: 'Explore the emerging trends and technologies shaping digital marketing.',
    content: 'Full blog content here...',
    image: '/blog/future-of-digital-marketing-2024.webp',
    author: 'John Doe',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    category: 'Digital Marketing',
    slug: 'future-of-digital-marketing-2024'
  },
  {
    id: 2,
    title: 'AI-Powered Personalization: Next-Level Customer Experiences',
    excerpt: 'How machine learning is transforming one-to-one marketing at scale.',
    content: 'Full blog content here...',
    image: '/blog/ai-personalization.webp',
    author: 'Jane Smith',
    date: 'Feb 02, 2024',
    readTime: '6 min read',
    category: 'AI & Automation',
    slug: 'ai-powered-personalization'
  },
  {
    id: 3,
    title: 'Video Marketing Strategies That Convert in 2024',
    excerpt: 'Best practices for using short- and long-form video to drive engagement.',
    content: 'Full blog content here...',
    image: '/blog/video-marketing-2024.webp',
    author: 'Michael Lee',
    date: 'Mar 10, 2024',
    readTime: '7 min read',
    category: 'Content Marketing',
    slug: 'video-marketing-strategies-2024'
  },
  {
    id: 4,
    title: 'Voice Search Optimization: How to Get Found',
    excerpt: 'Tips for structuring your content to win voice-search queries.',
    content: 'Full blog content here...',
    image: '/blog/voice-search-optimization.webp',
    author: 'Emily Johnson',
    date: 'Apr 05, 2024',
    readTime: '4 min read',
    category: 'SEO',
    slug: 'voice-search-optimization'
  },
  {
    id: 5,
    title: 'Influencer Marketing: Beyond the Basics',
    excerpt: 'Leveraging micro- and nano-influencers to boost niche campaigns.',
    content: 'Full blog content here...',
    image: '/blog/influencer-marketing-beyond-basics.webp',
    author: 'David Patel',
    date: 'May 12, 2024',
    readTime: '6 min read',
    category: 'Social Media',
    slug: 'influencer-marketing-beyond-basics'
  },
  {
    id: 6,
    title: 'SEO in 2024: E-A-T, Core Web Vitals & Beyond',
    excerpt: 'Mastering Google’s latest algorithm updates for higher rankings.',
    content: 'Full blog content here...',
    image: '/blog/seo-2024-core-web-vitals.webp',
    author: 'Sara Khan',
    date: 'Jun 20, 2024',
    readTime: '8 min read',
    category: 'SEO',
    slug: 'seo-2024-eat-core-web-vitals'
  },
  {
    id: 7,
    title: 'Augmented Reality in Retail: Bridging Physical & Digital',
    excerpt: 'Practical AR scenarios that delight shoppers and boost sales.',
    content: 'Full blog content here...',
    image: '/blog/ar-in-retail.webp',
    author: 'Li Wei',
    date: 'Jul 08, 2024',
    readTime: '7 min read',
    category: 'Emerging Tech',
    slug: 'ar-in-retail-bridging-physical-digital'
  },
  {
    id: 8,
    title: 'Data Privacy & Marketing: Navigating GDPR & CCPA',
    excerpt: 'Building trust and compliance into your data-driven strategies.',
    content: 'Full blog content here...',
    image: '/blog/data-privacy-marketing.webp',
    author: 'Carlos Rodriguez',
    date: 'Aug 14, 2024',
    readTime: '5 min read',
    category: 'Compliance',
    slug: 'data-privacy-marketing-gdpr-ccpa'
  },
  {
    id: 9,
    title: 'Blockchain for Brand Loyalty Programs',
    excerpt: 'Using decentralized ledgers to create transparent, rewardable ecosystems.',
    content: 'Full blog content here...',
    image: '/blog/blockchain-loyalty.webp',
    author: 'Fatima Ali',
    date: 'Sep 03, 2024',
    readTime: '6 min read',
    category: 'Innovation',
    slug: 'blockchain-brand-loyalty-programs'
  },
  {
    id: 10,
    title: 'Omnichannel Campaigns: Unifying Customer Touchpoints',
    excerpt: 'Strategies for consistent messaging across web, mobile, email, and in-store.',
    content: 'Full blog content here...',
    image: '/blog/omnichannel-campaigns.webp',
    author: 'Hiro Tanaka',
    date: 'Oct 22, 2024',
    readTime: '7 min read',
    category: 'Digital Strategy',
    slug: 'omnichannel-campaigns-unifying-touchpoints'
  }
]
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
                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read More
                    <FaChevronRight className={styles.arrow} />
                </Link>
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