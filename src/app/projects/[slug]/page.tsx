import { workProjects } from '../../../json/project'
import ProjectDetail from '../../../components/project/projectdetail/ProjectDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return workProjects.map((project) => ({
    // Extract just the last segment of the link as the slug
    slug: project.link.split('/').pop() as string
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const project = workProjects.find((p) => p.link.endsWith(`/${resolvedParams.slug}`))

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found'
    }
  }

  return {
    title: `${project.title} | Ditvi Technologies Portfolio`,
    description: project.description
  }
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const project = workProjects.find((p) => p.link.endsWith(`/${resolvedParams.slug}`))


  if (!project) {
    notFound()
  }

  return <ProjectDetail params={resolvedParams} />
}
