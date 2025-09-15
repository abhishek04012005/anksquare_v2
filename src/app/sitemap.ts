import { MetadataRoute } from 'next'
import { blogPosts } from '@/json/blog'
import { marketplaceServices, websiteTypes } from '@/json/services'
import { certificates } from '@/json/certificates'
import { cityMetadata } from '@/json/cities'

// Add static export configuration
export const dynamic = 'force-static'
export const revalidate = false

// Helper function to normalize slugs
async function normalizeSlug(slug: string): Promise<string> {
  return Promise.resolve(slug.toLowerCase().replace(/\s+/g, '-'))
}

// Helper function to format date
function formatDate(date: Date | string): string {
  return new Date(date).toISOString()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://anksquare.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: formatDate(new Date()),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: formatDate(new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: formatDate(new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ]

  // Service category pages
  const serviceCategoryPages = [
    {
      url: `${baseUrl}/service/marketplace`,
      lastModified: formatDate(new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/website`,
      lastModified: formatDate(new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ]

  try {
    // City-specific service pages
    const cityServiceUrls = await Promise.all(
      Object.keys(cityMetadata).flatMap(city =>
        [...marketplaceServices, ...websiteTypes].map(async service => ({
          url: `${baseUrl}/service/${await normalizeSlug(service.slug)}/${city.toLowerCase()}`,
          lastModified: formatDate(new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        }))
      )
    )

    // Blog posts
    const blogUrls = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: formatDate(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Certificates
    const certificateUrls = certificates
      .filter(cert => cert.hasViewOption)
      .map(certificate => ({
        url: `${baseUrl}/certificates/${certificate.slug}`,
        lastModified: formatDate(certificate.certificationDate),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))

    // City location pages
    const cityLocationUrls = Object.keys(cityMetadata).map(city => ({
      url: `${baseUrl}/locations/${city.toLowerCase()}`,
      lastModified: formatDate(new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Combine all URLs and ensure they're properly formatted
    const allUrls = [
      ...staticPages,
      ...serviceCategoryPages,
      ...cityServiceUrls.flat(),
      ...blogUrls,
      ...certificateUrls,
      ...cityLocationUrls
    ].map(route => ({
      ...route,
      url: route.url.endsWith('/') ? route.url : `${route.url}/`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority
    }))

    return allUrls

  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}