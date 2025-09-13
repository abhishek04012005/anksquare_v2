import { certificates } from '@/json/certificates';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CertificateView from '@/components/certificatemodal/CertificateModal';
import { Certificate } from '../../../json/certificates';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper function to get certificate data with Promise
async function getCertificateData(params: Promise<{ slug: string }>): Promise<Certificate | null> {
  try {
    const resolvedParams = await params;
    return new Promise((resolve) => {
      const certificate = certificates.find(cert => cert.slug === resolvedParams.slug);
      resolve(certificate || null);
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return Promise.reject(error);
  }
}

// Helper function to get valid certificates
async function getValidCertificates(): Promise<{ slug: string }[]> {
  return new Promise((resolve) => {
    try {
      const validCerts = certificates
        .filter(cert => cert.hasViewOption)
        .map(cert => ({ slug: cert.slug }));
      resolve(validCerts);
    } catch (error) {
      console.error('Error getting valid certificates:', error);
      resolve([]);
    }
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getValidCertificates();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const certificate = await getCertificateData(params);
    
    if (!certificate) {
      return Promise.resolve({
        title: 'Certificate Not Found'
      });
    }

    return Promise.resolve({
      title: `${certificate.title} | Official Certificate`,
      description: certificate.description,
      openGraph: {
        title: `${certificate.title} Certificate`,
        description: certificate.description,
        images: [{ url: certificate.certificateImage }],
        type: 'website'
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export default async function CertificatePage({ params }: PageProps) {
  try {
    const certificate = await getCertificateData(params);

    if (!certificate || !certificate.hasViewOption) {
      return notFound();
    }

    return new Promise((resolve) => {
      resolve(
        <CertificateView 
          certificate={certificate}
          key={`certificate-${certificate.slug}`}
        />
      );
    });
  } catch (error) {
    console.error('Error rendering certificate page:', error);
    return Promise.reject(error);
  }
}