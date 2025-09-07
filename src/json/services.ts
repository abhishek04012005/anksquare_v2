import { StaticImageData } from 'next/image'
import { FC } from 'react'
import MerchantAccountSvg from "../../public/assets/svg/AccountManagerSVG/AccountManagerSVG"
import WebsiteDevelopmentSvg from "../../public/assets/svg/WebDevelopmentSVG/WebDevelopmentSVG"


import BusinessWebsiteImage from "../../public/assets/services/businesswebsite.svg"
import EcommerceWebsiteImage from "../../public/assets/services/ecommercewebsite.svg"
import RealEstateWebsiteImage from "../../public/assets/services/realestatewebsite.svg"
import EducationWebsiteImage from "../../public/assets/services/educationwebsite.svg"



// Import marketplace logos
import AmazonLogo from '../assets/services/amazon.png'
import FlipkartLogo from '../assets/services/flipkart.png'
import BlinkitLogo from '../assets/services/blinkit.png'
import MyntraLogo from '../assets/services/myntra.png'
import MeeshoLogo from '../assets/services/meesho.png'
import AjioLogo from '../assets/services/ajio.png'
import JiomartLogo from '../assets/services/jiomart.png'
import NykaaLogo from '../assets/services/nykaa.png'





export interface MainServiceProps {
    id: number
    title: string
    description: string
    features: string[]
    image: FC
    path: string

}

export interface SubService {
    id: number
    title: string
    logo: StaticImageData 
    features: string[]
    path: string
}

export const mainServices: MainServiceProps[] = [
    {
        id: 1,
        title: 'Merchant Account Management',
        description: 'Comprehensive e-commerce account management solutions across all major platforms in India. We help businesses establish and grow their online presence through marketplace optimization.',
        features: [
            'Multi-Platform Integration',
            'Account Setup & Optimization',
            'Sales & Performance Analytics',
            'Inventory Management',
            'Customer Service Support'
        ],
        image: MerchantAccountSvg,
        path: '/services/merchant-management'
    },
    {
        id: 2,
        title: 'Website Development',
        description: 'Create stunning, responsive websites that drive results. Our expert team builds custom solutions using cutting-edge technologies to ensure your online success.',
        features: [
            'Custom Design & Development',
            'Responsive & Mobile-First',
            'SEO Optimization',
            'Performance Tuning',
            'Ongoing Support'
        ],
        image: WebsiteDevelopmentSvg,
        path: '/services/web-development'
    }
]
export const marketplaceServices: SubService[] = [
    {
        id: 1,
        title: 'Amazon',
        logo: AmazonLogo,
        features: [
            'Account Setup & Verification',
            'Product Listing Optimization',
            'PPC Campaign Management',
        ],
        path: '/services/amazon',
    },
    {
        id: 2,
        title: 'Flipkart',
        logo: FlipkartLogo,
        features: [
            'Seller Registration & KYC',
            'Catalog Management',
            'Promotions & Campaigns',
        ],
        path: '/services/flipkart',
    },
    {
        id: 3,
        title: 'Blinkit',
        logo: BlinkitLogo,
        features: [
            'Quick Commerce Integration',
            'Inventory Syncing',
            'Geo-targeted Listings',
        ],
        path: '/services/blinkit',
    },
    {
        id: 4,
        title: 'Myntra',
        logo: MyntraLogo,
        features: [
            'Fashion Product Onboarding',
            'Brand Store Setup',
            'Seasonal Campaign Strategy',
        ],
        path: '/services/myntra',
    },
    {
        id: 5,
        title: 'Meesho',
        logo: MeeshoLogo,
        features: [
            'Reseller-Friendly Listings',
            'Bulk Upload Assistance',
            'COD & Logistics Setup',
        ],
        path: '/services/meesho',
    },
    {
        id: 6,
        title: 'Ajio',
        logo: AjioLogo,
        features: [
            'Premium Fashion Onboarding',
            'Brand Guidelines Compliance',
            'Pricing & Discount Strategy',
        ],
        path: '/services/ajio',
    },
    {
        id: 7,
        title: 'JioMart',
        logo: JiomartLogo,
        features: [
            'Grocery & FMCG Listings',
            'Vendor Portal Setup',
            'Order Fulfillment Support',
        ],
        path: '/services/jiomart',
    },
    {
        id: 8,
        title: 'Nykaa',
        logo: NykaaLogo,
        features: [
            'Beauty Product Onboarding',
            'Brand Page Design',
            'Influencer Campaign Coordination',
        ],
        path: '/services/nykaa',
    },
]


export const websiteTypes: SubService[] = [
    {
        id: 1,
        title: 'Business Website',
        logo: BusinessWebsiteImage,
        features: [
            'Professional Design',
            'Lead Generation Forms',
            'Analytics Integration'
        ],
        path: '/services/business-website'
    },
    {
        id: 2,
        title: 'E-commerce Website',
        logo: EcommerceWebsiteImage,
        features: [
            'Product Catalog Management',
            'Shopping Cart Integration',
            'Payment Gateway Setup'
        ],
        path: '/services/ecommerce-website'
    },
    {
        id: 3,
        title: 'Real Estate Website',
        logo: RealEstateWebsiteImage,
        features: [
            'Property Listings',
            'Virtual Tours',
            'Lead Capture Forms'
        ],
        path: '/services/real-estate-website'
    },
    {
        id: 4,
        title: 'Education Website',
        logo: EducationWebsiteImage,
        features: [
            'Course Management',
            'Student Enrollment',
            'Progress Tracking'
        ],
        path: '/services/education-website'
    }
]