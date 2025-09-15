import type { Metadata } from 'next';
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Services from "@/components/service/Service";
import Testimonial from "@/components/testimonial/Testimonial";
import Blog from "@/components/blog/Blog";
import Clients from "@/components/clients/Clients";

export const metadata: Metadata = {
  title: 'Anksquare | E-commerce Growth Solutions & Marketplace Management',
  description: 'Transform your business with our expert e-commerce solutions. We offer marketplace management, digital growth services, and technical support for Amazon, Flipkart, and more.',
  openGraph: {
    title: 'Anksquare | E-commerce Growth Solutions',
    description: 'Expert e-commerce solutions and marketplace management services',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Anksquare - E-commerce Solutions',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
  keywords: [
    'e-commerce solutions',
    'marketplace management',
    'Amazon seller services',
    'Flipkart seller services',
    'online business growth',
    'e-commerce consulting'
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Anksquare',
            url: process.env.NEXT_PUBLIC_BASE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />
      <main>
        <Hero />
        <About />
        <Services />
        <Blog />
        <Clients />
        <Testimonial />
        <Contact />
      </main>
    </>
  );
}