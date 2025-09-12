import { marketplaceServices } from '@/json/services';
import { cityMetadata } from '../../../../json/cities';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubServiceDetail from '@/components/service/subservicedetail/SubServiceDetail';
import Script from 'next/script';

// Interface with Promise type
interface PageProps {
    params: Promise<{
        slug: string;
        city: string;
    }>;
}

// Helper function to handle Promise params
async function getServiceData(params: Promise<{ slug: string; city: string }>) {
    try {
        const { slug, city } = await params;
        const [service, cityData] = await Promise.all([
            marketplaceServices.find(s => s.slug === slug),
            cityMetadata[city.toLowerCase()]?.services[slug]
        ]);

        if (!service || !cityData) {
            throw new Error('Service or city data not found');
        }

        return { service, cityData };
    } catch (error) {
        console.error('Error fetching service data:', error);
        return null;
    }

    // try {
    //     const { slug, city } = await params;
    //     const service = [...marketplaceServices, ...websiteTypes].find(s => s.slug === slug);
    //     const cityData = cityMetadata[city.toLowerCase()]?.services[slug];

    //     if (!service || !cityData) {
    //         throw new Error('Service or city data not found');
    //     }

    //     return { service, cityData };
    // } catch (error) {
    //     console.error('Error fetching service data:', error);
    //     return null;
    // }


}

export async function generateStaticParams() {
    return Object.keys(cityMetadata).flatMap(city =>
        marketplaceServices.map(service => ({
            slug: service.slug,
            city: city.toLowerCase()
        }))
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const data = await getServiceData(params);
        if (!data) return notFound();

        const { cityData } = data;
        const resolvedParams = await params;
        const baseUrl = `https://anksquare.com/service/${resolvedParams.slug}/${resolvedParams.city}`;

        return {
            title: cityData.title,
            description: cityData.description,
            openGraph: {
                title: cityData.title,
                description: cityData.description,
                url: baseUrl,
                siteName: 'Anksquare',
                locale: 'en_IN',
                type: 'website',
            },
            alternates: {
                canonical: baseUrl,
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return notFound();
    }
}

export default async function Page({ params }: PageProps) {
    try {
        const data = await getServiceData(params);
        if (!data) return notFound();

        const { service, cityData } = data;
        const resolvedParams = await params;

        const localizedService = {
            ...service,
            title: cityData.heading,
            details: {
                ...service.details,
                overview: cityData.overview
            }
        };

        const schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": cityData.heading,
            "description": cityData.overview,
            "provider": {
                "@type": "Organization",
                "name": "Anksquare",
                areaServed: {
                    "@type": "City",
                    "name": resolvedParams.city
                }
            }
        };

        return (
            <>
                <Script
                    id="service-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
                <SubServiceDetail
                    service={localizedService}
                    city={resolvedParams.city}
                    key={`${resolvedParams.slug}-${resolvedParams.city}`}
                />
            </>
        );
    } catch (error) {
        console.error('Error rendering page:', error);
        return notFound();
    }
}