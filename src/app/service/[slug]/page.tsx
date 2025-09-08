import { marketplaceServices, websiteTypes } from '@/json/services';
import SubServiceDetail from '../../../components/service/subservicedetail/SubServiceDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return [...marketplaceServices, ...websiteTypes].map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const service = [...marketplaceServices, ...websiteTypes].find(
    (s) => s.slug === resolvedParams.slug
  );

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found',
    };
  }

  return {
    title: `${service.title} | Anksquare`,
    // description: service.description,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const service = [...marketplaceServices, ...websiteTypes].find(
    (s) => s.slug === resolvedParams.slug
  );

  if (!service) {
    notFound();
  }

  return <SubServiceDetail service={service} />;
}