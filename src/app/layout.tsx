import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { GOOGLE_SITE_VERIFICATION } from "@/lib/googleSearchConsole";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://anksquare.com'),
  title: {
    default: "Anksquare | E-commerce Growth Solutions & Marketplace Management",
    template: "%s | Anksquare"
  },
  description: "Anksquare helps businesses grow online with expert e-commerce solutions, marketplace management, and digital services for Amazon, Flipkart, and more.",
  keywords: ["e-commerce solutions", "marketplace management", "Amazon seller services", "Flipkart seller services", "online business growth"],
  authors: [{ name: "Anksquare" }],
  creator: "Anksquare",
  publisher: "Anksquare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Anksquare',
    title: 'Anksquare | E-commerce Growth Solutions & Marketplace Management',
    description: 'Anksquare helps businesses grow online with expert e-commerce solutions, marketplace management, and digital services.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Anksquare - E-commerce Solutions',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anksquare | E-commerce Growth Solutions',
    description: 'Expert e-commerce solutions and marketplace management services',
    creator: '@anksquare',
    images: ['/images/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        
        {/* Schema.org Organization markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Anksquare',
              url: process.env.NEXT_PUBLIC_BASE_URL,
              logo: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`,
              sameAs: [
                'https://facebook.com/anksquare',
                'https://twitter.com/anksquare',
                'https://linkedin.com/company/anksquare',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-XXXXXXXXXX',
                contactType: 'customer service',
                areaServed: 'IN',
                availableLanguage: ['English', 'Hindi'],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}