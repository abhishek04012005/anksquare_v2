import { marketplaceServices, websiteTypes } from '@/json/services';
import { cityMetadata } from '../../../../json/cities';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubServiceDetail from '@/components/service/subservicedetail/SubServiceDetail';
import Script from 'next/script';

interface PageProps {
    params: Promise<{
        slug: string;
        city: string;
    }>;
}

// Helper function to normalize slugs with Promise
async function normalizeSlug(slug: string): Promise<string> {
    return Promise.resolve(slug.toLowerCase().replace(/\s+/g, '-'));
}

// Helper function to get services with Promise
async function getServices(): Promise<typeof marketplaceServices | typeof websiteTypes> {
    return Promise.resolve([...marketplaceServices, ...websiteTypes]);
}

// Helper function to get service data with Promise chain
async function getServiceData(params: Promise<{ slug: string; city: string }>) {
    try {
        const { slug, city } = await params;
        const [normalizedSlug, allServices] = await Promise.all([
            normalizeSlug(slug),
            getServices()
        ]);
        
        const servicePromise = Promise.resolve(
            allServices.find(async s => await normalizeSlug(s.slug) === normalizedSlug)
        );
        
        const cityDataPromise = Promise.resolve(
            cityMetadata[city.toLowerCase()]?.services[normalizedSlug]
        );

        const [service, cityData] = await Promise.all([servicePromise, cityDataPromise]);

        if (!service || !cityData) {
            throw new Error('Service or city data not found');
        }

        return { service, cityData };
    } catch (error) {
        console.error('Error fetching service data:', error);
        return null;
    }
}

export async function generateStaticParams() {
    try {
        const [cities, allServices] = await Promise.all([
            Promise.resolve(Object.keys(cityMetadata)),
            getServices()
        ]);
        
        return await Promise.all(
            cities.flatMap(city =>
                allServices.map(async service => ({
                    slug: await normalizeSlug(service.slug),
                    city: city.toLowerCase()
                }))
            )
        );
    } catch (error) {
        console.error('Error generating params:', error);
        return [];
    }
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
        const isWebsite = service.slug.includes('website');

        const localizedService = await Promise.resolve({
            ...service,
            title: cityData.heading,
            details: {
                ...service.details,
                overview: cityData.overview,
                type: isWebsite ? 'website' : 'marketplace'
            }
        });

        const schema = await Promise.resolve({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": cityData.heading,
            "description": cityData.overview,
            "provider": {
                "@type": "Organization",
                "name": "Anksquare",
                "areaServed": {
                    "@type": "City",
                    "name": resolvedParams.city
                }
            }
        });

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