import { services } from '../../../json/services';
import ServiceDetail from '@/components/service/servicedetail/ServiceDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export interface PageProps {
  params:
  Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return services.map((service) => ({
    slug: service.path.replace('/services/', ''),
  }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const service = services.find(async (s) => s.path === `/services/${(await params).slug}`);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found',
    };
  }

  return {
    title: `${service.title} | Ditvi Technologies`,
    description: service.description,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const service = services.find((s) => s.path === `/services/${resolvedParams.slug}`);

  if (!service) {
    notFound();
  }

  return <ServiceDetail params={resolvedParams} />;
}
