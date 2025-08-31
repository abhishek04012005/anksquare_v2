import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectView from '@/components/projectview/ProjectView'
import { clients } from '@/json/client'

interface PageProps {

    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return clients.map(client => ({
        slug: client.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const client = clients.find(async c => c.slug === (await params).slug)

    if (!client) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        }
    }

    return {
        title: `${client.name} - Project Portfolio | Ditvi Technologies`,
        description: `View our work for ${client.name}: ${client.project}`,
        openGraph: {
            title: client.name,
            description: client.project,
            type: 'article',
        },
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const client = clients.find(async c => c.slug === (await params).slug)

    if (!client) {
        notFound()
    }

    return (
        <div className="project-page">
            <ProjectView slug={(await params).slug} />
        </div>
    )
}