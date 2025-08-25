import { blogPosts } from '../../../json/blog'
import BlogDetail from '../../../components/blog/blogdetail/BlogDetials'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
    params: Promise<{ slug: string }>

}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = blogPosts.find(async p => p.slug === (await params).slug)

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found'
        }
    }

    return {
        title: `${post.title} | Ditvi Technologies Blog`,
        description: post.excerpt
    }
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
      notFound();
    }

    return <BlogDetail params={resolvedParams} />
}