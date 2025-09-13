import { blogPosts } from '../../../json/blog'
import BlogDetail from '../../../components/blog/blogdetail/BlogDetials'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BlogPost } from '@/json/blog'

interface PageProps {
    params: Promise<{ slug: string }>
}

// Helper function to get blog data with Promise
async function getBlogData(params: Promise<{ slug: string }>): Promise<BlogPost | null> {
    try {
        const resolvedParams = await params;
        return Promise.resolve(
            blogPosts.find(post => post.slug === resolvedParams.slug) || null
        );
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return null;
    }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
    return Promise.resolve(
        blogPosts.map((post) => ({
            slug: post.slug
        }))
    );
}

// Generate SEO metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await getBlogData(params);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anksquare.com';

    if (!post) {
        return {
            title: 'Post Not Found | Anksquare Blog',
            description: 'The requested blog post could not be found',
            robots: 'noindex, nofollow'
        };
    }

    return {
        title: `${post.title} | Expert E-commerce Insights | Anksquare Blog`,
        description: post.excerpt,
        keywords: [post.category, 'e-commerce', 'marketplace', 'online selling', 'digital marketing'],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: [
                {
                    url: `${baseUrl}${post.image}`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
            siteName: 'Anksquare',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [`${baseUrl}${post.image}`],
            creator: '@anksquare',
        },
        alternates: {
            canonical: `${baseUrl}/blog/${post.slug}`,
        },
        authors: [{ name: post.author }],

    };
}

export default async function BlogPage({ params }: PageProps) {
    const post = await getBlogData(params);

    if (!post) {
        return notFound();
    }

    return (
        <>
            {/* Add structured data for blog post */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.excerpt,
                        image: `${process.env.NEXT_PUBLIC_BASE_URL}${post.image}`,
                        datePublished: post.date,
                        dateModified: post.date,
                        author: {
                            '@type': 'Person',
                            name: post.author,
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Anksquare',
                            logo: {
                                '@type': 'ImageObject',
                                url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`
                            }
                        },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`
                        },
                        keywords: [post.category, 'e-commerce', 'marketplace', 'online selling'],
                        articleSection: post.category,
                        timeRequired: post.readTime
                    })
                }}
            />

            <BlogDetail 
                params={await params} 
            />
        </>
    );
}