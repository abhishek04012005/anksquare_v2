'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiClock, FiUser, FiCalendar, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi'
import { blogPosts, BlogPost } from '../../../json/blog'
import styles from './BlogDetails.module.css'

interface BlogDetailProps {
  params: {
    slug: string
  }
}

const BlogDetail: React.FC<BlogDetailProps> = ({ params }) => {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const currentPost = blogPosts.find(p => p.slug === params.slug)
    if (currentPost) {
      setPost(currentPost)
      // Find related posts in same category
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3)
      setRelatedPosts(related)
    }
  }, [params.slug])

  if (!post) return null

  return (
    <article className={styles.blogDetail}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.breadcrumb}
          >
            <Link href="/blog">Blog</Link> / <span>{post.category}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={styles.title}
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.meta}
          >
            <div className={styles.metaItem}>
              <FiUser className={styles.icon} />
              <span>{post.author}</span>
            </div>
            <div className={styles.metaItem}>
              <FiCalendar className={styles.icon} />
              <span>{post.date}</span>
            </div>
            <div className={styles.metaItem}>
              <FiClock className={styles.icon} />
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.mainContent}
          >
            <div className={styles.featuredImage}>
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={600}
                priority
                className={styles.image}
              />
              <span className={styles.category}>{post.category}</span>
            </div>

            <div className={styles.articleContent}>
              <p className={styles.excerpt}>{post.excerpt}</p>
              
              {/* Sample content sections - replace with actual content */}
              <h2>Introduction</h2>
              <p>Detailed introduction goes here...</p>

              <h2>Key Points</h2>
              <ul>
                <li>First major point with explanation</li>
                <li>Second major point with details</li>
                <li>Third important consideration</li>
              </ul>

              <h2>Analysis</h2>
              <p>In-depth analysis section goes here...</p>

              <div className={styles.quote}>
                <blockquote>
                  &quot;Important quote or highlight from the article goes here.&quot;
                </blockquote>
                <cite>- Expert Name</cite>
              </div>

              <h2>Conclusion</h2>
              <p>Concluding thoughts and takeaways...</p>
            </div>

            <div className={styles.share}>
              <span>Share this article:</span>
              <div className={styles.socialLinks}>
                <button aria-label="Share on LinkedIn">
                  <FiLinkedin />
                </button>
                <button aria-label="Share on Twitter">
                  <FiTwitter />
                </button>
                <button aria-label="Share on Facebook">
                  <FiFacebook />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.sidebar}
          >
            <div className={styles.authorCard}>
              <Image
                src="/team/author-avatar.jpg"
                alt={post.author}
                width={80}
                height={80}
                className={styles.authorImage}
              />
              <h3>{post.author}</h3>
              <p>Expert in {post.category}</p>
            </div>

            <div className={styles.relatedPosts}>
              <h3>Related Articles</h3>
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className={styles.relatedPost}
                >
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    width={100}
                    height={60}
                    className={styles.relatedImage}
                  />
                  <div className={styles.relatedInfo}>
                    <h4>{relatedPost.title}</h4>
                    <span>{relatedPost.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </article>
  )
}

export default BlogDetail