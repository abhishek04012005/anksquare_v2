import ServImage1 from "../assets/services/serv1.jpg"
import ServImage7 from "../assets/services/serv7.jpg"
import AmazonImage from "../assets/services/amazon.png"
import FlipkartImage from "../assets/services/flipkart.png"
import BlinkitImage from "../assets/services/blinkit.png"
import MyntraImage from "../assets/services/myntra.png"
import MeeshoImage from "../assets/services/meesho.png"
import AjioImage from "../assets/services/ajio.png"
import JiomartImage from "../assets/services/jiomart.png"
import NykaaImage from "../assets/services/nykaa.png"


import type { StaticImageData } from 'next/image'

export interface ServiceItem {
    id: number
    title: string
    description: string
    features: string[]
    image: string | StaticImageData
    path: string
    isSlider?: boolean 
}


export const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Merchant Account Management',
    description: 'Set up and manage merchant accounts across major platforms with secure payment integration, compliance handling, and transaction insights.',
    features: [
      'Merchant Account Setup',
      'Payment Gateway Integration',
      'Chargeback Resolution',
      'Transaction Monitoring',
      'Compliance & KYC Support'
    ],
    image: ServImage1,
    path: '/services/merchant-management'
  },
  {
    id: 2,
    title: 'Amazon',
    description: 'Accelerate your Amazon business with optimized listings, FBA setup, ad campaigns, and brand registry support.',
    features: [
      'Product Listing Optimization',
      'Amazon SEO & A+ Content',
      'Sponsored Ads Management',
      'FBA & Inventory Setup',
      'Brand Registry Assistance'
    ],
    image: AmazonImage,
    path: '/services/amazon'
  },
  {
    id: 3,
    title: 'Flipkart',
    description: 'Boost your Flipkart presence with catalog management, pricing strategies, and performance analytics tailored for Indian eCommerce.',
    features: [
      'Seller Onboarding',
      'Catalog & Listing Services',
      'Pricing & Promotions Strategy',
      'Order Fulfillment Support',
      'Performance Reporting'
    ],
    image: FlipkartImage,
    path: '/services/flipkart'
  },
  {
    id: 4,
    title: 'Blinkit',
    description: 'Enable hyperlocal delivery on Blinkit with real-time inventory sync, order tracking, and promotional campaign setup.',
    features: [
      'Seller Integration',
      'Inventory Sync',
      'Real-Time Order Tracking',
      'Local Promotions',
      'Delivery Analytics'
    ],
    image: BlinkitImage,
    path: '/services/blinkit'
  },
  {
    id: 5,
    title: 'Myntra',
    description: 'Launch your fashion brand on Myntra with curated styling, influencer tie-ins, and seasonal campaign planning.',
    features: [
      'Fashion Catalog Curation',
      'Styling & Visual Merchandising',
      'Influencer Collaboration',
      'Seasonal Campaigns',
      'Return & Exchange Optimization'
    ],
    image: MyntraImage,
    path: '/services/myntra'
  },
  {
    id: 6,
    title: 'Meesho',
    description: 'Grow your reseller network on Meesho with mobile-first cataloging, pricing strategies, and viral product promotion.',
    features: [
      'Mobile Catalog Setup',
      'Reseller Engagement Tools',
      'Pricing & Margin Strategy',
      'WhatsApp Product Sharing',
      'Order Fulfillment Support'
    ],
    image: MeeshoImage,
    path: '/services/meesho',
    isSlider: true
  },
  {
    id: 7,
    title: 'Nykaa',
    description: 'Establish your beauty brand on Nykaa with high-quality product visuals, influencer marketing, and campaign execution.',
    features: [
      'Beauty Product Photography',
      'Influencer Tie-ups',
      'Campaign Planning',
      'Nykaa Seller Onboarding',
      'Brand Storytelling'
    ],
    image: NykaaImage,
    path: '/services/nykaa',
    isSlider: true
  },
  {
    id: 8,
    title: 'Ajio',
    description: 'Sell fashion and lifestyle products on Ajio with curated catalogs, brand positioning, and seasonal promotions.',
    features: [
      'Ajio Seller Registration',
      'Catalog Management',
      'Brand Positioning',
      'Seasonal Promotions',
      'Sales Analytics'
    ],
    image: AjioImage,
    path: '/services/ajio',
    isSlider: true
  },
  {
    id: 9,
    title: 'Jiomart',
    description: 'Expand your grocery or FMCG brand on Jiomart with bulk inventory sync, local delivery setup, and promotional campaigns.',
    features: [
      'Jiomart Seller Integration',
      'Bulk Inventory Upload',
      'Local Delivery Coordination',
      'Promotional Campaigns',
      'Order Management'
    ],
    image: JiomartImage,
    path: '/services/jiomart',
    isSlider: true
  },
  {
    id: 10,
    title: 'Web Development',
    description: 'Build scalable, SEO-optimized websites and web apps using modern frameworks like Next.js, React, and Express.',
    features: [
      'Custom Website Development',
      'Next.js & React Integration',
      'SEO & Accessibility Optimization',
      'Responsive UI/UX Design',
      'Deployment on Shared Hosting (cPanel)'
    ],
    image: ServImage7,
    path: '/services/web-development'
  }
]
