import { StaticImageData } from 'next/image'
import { FC } from 'react'
import MerchantAccountSvg from "../custom/svg/AccountManagerSVG/AccountManagerSVG"
import WebsiteDevelopmentSvg from "../custom/svg/WebDevelopmentSVG/WebDevelopmentSVG"



interface ServiceDetail {
    overview: string;
    benefits: {
        title: string;
        description: string;
        icon?: string;
    }[];
    process: {
        step: number;
        title: string;
        description: string;
    }[];
    faq: {
        question: string;
        answer: string;
    }[];
    pricing: {
        plan: string;
        price: string;
        features: string[];
    }[];
}


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
    logo: string
    features: string[]
    path: string
    slug: string
    details: ServiceDetail
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
        logo: "./services/amazon.png",
        features: [
            'Account Setup & Verification',
            'Product Listing Optimization',
            'PPC Campaign Management',
        ],
        path: '/amazon',
        slug: 'amazon',
        details: {
            overview: 'Our Amazon marketplace management service helps businesses establish and grow their presence on the world\'s largest e-commerce platform.',
            benefits: [
                { title: 'Enhanced Visibility', description: 'Optimize your product listings for maximum visibility in Amazon search results.' },
                { title: 'Sales Growth', description: 'Strategic pricing and promotion management to boost your sales performance.' },
                { title: 'Brand Protection', description: 'Maintain brand integrity and manage customer feedback effectively.' }
            ],
            process: [
                { step: 1, title: 'Account Setup', description: 'Complete account registration and verification process' },
                { step: 2, title: 'Catalog Optimization', description: 'Product listing creation and optimization' },
                { step: 3, title: 'Performance Management', description: 'Regular monitoring and optimization of account performance' }
            ],
            faq: [
                { question: 'How long does it take to set up an Amazon seller account?', answer: 'Typically, it takes 24-48 hours for the basic setup, but full optimization may take 1-2 weeks.' },
                { question: 'What type of support do you provide?', answer: 'We offer end-to-end support including account setup, listing optimization, PPC management, and ongoing performance monitoring.' }
            ],
            pricing: [
                { plan: 'Basic', price: '₹9,999/month', features: ['Account Setup', 'Basic Optimization', 'Monthly Report'] },
                { plan: 'Professional', price: '₹24,999/month', features: ['Everything in Basic', 'PPC Management', 'Weekly Reports'] }
            ]
        }
    },
    {
        id: 2,
        title: 'Flipkart',
        logo: "./services/flipkart.png",
        features: [
            'Seller Registration & KYC',
            'Catalog Management',
            'Promotions & Campaigns',
        ],
        path: '/flipkart',
        slug: 'flipkart',
        details: {
            overview: 'Our Flipkart service helps sellers onboard quickly and optimize their presence on India\'s leading marketplace.',
            benefits: [
                { title: 'Fast Onboarding', description: 'Streamlined KYC and seller registration process.' },
                { title: 'Catalog Efficiency', description: 'Organized product listings with category-specific enhancements.' },
                { title: 'Campaign Success', description: 'Manage Flipkart promotions and maximize visibility during sales.' }
            ],
            process: [
                { step: 1, title: 'Seller Registration', description: 'Complete KYC and seller onboarding' },
                { step: 2, title: 'Catalog Setup', description: 'Create and optimize product listings' },
                { step: 3, title: 'Campaign Management', description: 'Run and monitor promotional campaigns' }
            ],
            faq: [
                { question: 'Can you help with Flipkart promotions?', answer: 'Yes, we assist with campaign setup, targeting, and performance tracking.' },
                { question: 'Do you provide catalog upload support?', answer: 'Absolutely. We handle bulk uploads and ensure compliance with Flipkart guidelines.' }
            ],
            pricing: [
                { plan: 'Starter', price: '₹7,499/month', features: ['Seller Setup', 'Basic Catalog', 'Monthly Summary'] },
                { plan: 'Growth', price: '₹19,999/month', features: ['Campaign Management', 'Advanced Catalog', 'Weekly Reports'] }
            ]
        }
    },
    {
        id: 3,
        title: 'Blinkit',
        logo: "./services/blinkit.png",
        features: [
            'Quick Commerce Integration',
            'Inventory Syncing',
            'Geo-targeted Listings',
        ],
        path: '/blinkit',
        slug: 'blinkit',
        details: {
            overview: 'Our Blinkit service helps brands tap into hyperlocal delivery with optimized quick commerce strategies.',
            benefits: [
                { title: 'Rapid Delivery Setup', description: 'Integrate with Blinkit\'s quick commerce infrastructure.' },
                { title: 'Inventory Accuracy', description: 'Real-time syncing to avoid stockouts and delays.' },
                { title: 'Geo-Targeting', description: 'Customize listings based on delivery zones and demand.' }
            ],
            process: [
                { step: 1, title: 'Partner Onboarding', description: 'Register and configure Blinkit seller account' },
                { step: 2, title: 'Inventory Sync', description: 'Connect product feed and stock levels' },
                { step: 3, title: 'Geo Optimization', description: 'Tailor listings for local delivery zones' }
            ],
            faq: [
                { question: 'Is Blinkit suitable for FMCG?', answer: 'Yes, it\'s ideal for fast-moving consumer goods and local delivery.' },
                { question: 'Do you support real-time inventory?', answer: 'We integrate systems to ensure accurate stock visibility.' }
            ],
            pricing: [
                { plan: 'Local', price: '₹6,999/month', features: ['Account Setup', 'Inventory Sync', 'Monthly Report'] },
                { plan: 'Hyperlocal Pro', price: '₹17,999/month', features: ['Geo Optimization', 'Priority Support', 'Weekly Insights'] }
            ]
        }
    },
    {
        id: 4,
        title: 'Myntra',
        logo: "./services/myntra.png",
        features: [
            'Fashion Product Onboarding',
            'Brand Store Setup',
            'Seasonal Campaign Strategy',
        ],
        path: '/myntra',
        slug: 'myntra',
        details: {
            overview: 'Our Myntra service helps fashion brands create premium storefronts and run seasonal campaigns effectively.',
            benefits: [
                { title: 'Stylish Presence', description: 'Design brand stores that reflect your fashion identity.' },
                { title: 'Seasonal Boosts', description: 'Plan and execute campaigns around festive and sale seasons.' },
                { title: 'Trend Alignment', description: 'Stay ahead with data-backed fashion insights.' }
            ],
            process: [
                { step: 1, title: 'Brand Onboarding', description: 'Register and verify fashion brand' },
                { step: 2, title: 'Store Design', description: 'Create branded storefront with curated collections' },
                { step: 3, title: 'Campaign Execution', description: 'Launch seasonal promotions and track results' }
            ],
            faq: [
                { question: 'Can you help with Myntra brand store setup?', answer: 'Yes, we design and configure your store to match brand guidelines.' },
                { question: 'Do you manage fashion campaigns?', answer: 'We plan, launch, and optimize campaigns for maximum impact.' }
            ],
            pricing: [
                { plan: 'Fashion Starter', price: '₹8,499/month', features: ['Store Setup', 'Basic Campaigns', 'Monthly Report'] },
                { plan: 'Fashion Pro', price: '₹21,999/month', features: ['Advanced Store Design', 'Seasonal Strategy', 'Weekly Reports'] }
            ]
        }
    },
    {
        id: 5,
        title: 'Meesho',
        logo: "./services/meesho.png",
        features: [
            'Reseller-Friendly Listings',
            'Bulk Upload Assistance',
            'COD & Logistics Setup',
        ],
        path: '/meesho',
        slug: 'meesho',
        details: {
            overview: 'Our Meesho service empowers sellers to reach resellers and consumers through simplified onboarding and logistics.',
            benefits: [
                { title: 'Reseller Reach', description: 'Create listings optimized for Meesho\'s reseller network.' },
                { title: 'Bulk Efficiency', description: 'Upload and manage large catalogs with ease.' },
                { title: 'Logistics Simplified', description: 'Enable COD and streamline delivery setup.' }
            ],
            process: [
                { step: 1, title: 'Seller Setup', description: 'Register and verify Meesho seller account' },
                { step: 2, title: 'Catalog Upload', description: 'Bulk upload products with optimized descriptions' },
                { step: 3, title: 'Logistics Integration', description: 'Configure delivery and payment options' }
            ],
            faq: [
                { question: 'Is Meesho good for small sellers?', answer: 'Yes, it\'s ideal for resellers and small businesses.' },
                { question: 'Do you support bulk uploads?', answer: 'We handle bulk uploads and ensure listing quality.' }
            ],
            pricing: [
                { plan: 'Reseller Basic', price: '₹5,999/month', features: ['Account Setup', 'Bulk Upload', 'Monthly Summary'] },
                { plan: 'Reseller Pro', price: '₹14,999/month', features: ['COD Setup', 'Advanced Catalog', 'Weekly Reports'] }
            ]
        }
    },
    {
        id: 6,
        title: 'Ajio',
        logo: "./services/ajio.png",
        features: [
            'Premium Fashion Onboarding',
            'Brand Guidelines Compliance',
            'Pricing & Discount Strategy',
        ],
        path: '/ajio',
        slug: 'ajio',
        details: {
            overview: 'Ajio is a premium fashion marketplace, and our service ensures your brand meets its high standards while maximizing visibility and conversions.',
            benefits: [
                { title: 'High-End Brand Positioning', description: 'Align your brand with Ajio’s premium fashion identity through curated onboarding.' },
                { title: 'Compliance Confidence', description: 'Ensure every listing meets Ajio’s strict brand and content guidelines.' },
                { title: 'Smart Pricing', description: 'Implement discount strategies that drive sales without compromising margins.' }
            ],
            process: [
                { step: 1, title: 'Brand Onboarding', description: 'Complete Ajio’s seller registration and brand approval process.' },
                { step: 2, title: 'Catalog Compliance', description: 'Structure listings to meet Ajio’s fashion and content standards.' },
                { step: 3, title: 'Pricing Strategy', description: 'Apply dynamic pricing and discount models for seasonal campaigns.' }
            ],
            faq: [
                { question: 'Is Ajio suitable for premium fashion brands?', answer: 'Yes, Ajio is ideal for curated fashion labels looking for premium positioning.' },
                { question: 'Do you help with Ajio’s brand approval?', answer: 'Absolutely. We guide you through documentation, content formatting, and catalog setup.' }
            ],
            pricing: [
                { plan: 'Standard', price: '₹8,999/month', features: ['Brand Onboarding', 'Catalog Setup', 'Monthly Report'] },
                { plan: 'Premium', price: '₹22,999/month', features: ['Compliance Audits', 'Pricing Strategy', 'Weekly Insights'] }
            ]
        }
    },
    {
        id: 7,
        title: 'JioMart',
        logo: "./services/jiomart.png",
        features: [
            'Grocery & FMCG Listings',
            'Vendor Portal Setup',
            'Order Fulfillment Support',
        ],
        path: '/jiomart',
        slug: 'jiomart',
        details: {
            overview: 'Our JioMart service helps FMCG and grocery sellers onboard efficiently and manage high-volume operations with ease.',
            benefits: [
                { title: 'Fast-Moving Listings', description: 'Create optimized listings for daily essentials and high-turnover products.' },
                { title: 'Vendor Portal Mastery', description: 'Navigate JioMart’s backend with confidence and control.' },
                { title: 'Fulfillment Efficiency', description: 'Streamline order processing and delivery coordination.' }
            ],
            process: [
                { step: 1, title: 'Vendor Registration', description: 'Complete onboarding and portal setup for JioMart.' },
                { step: 2, title: 'Product Listings', description: 'Upload and optimize grocery and FMCG items.' },
                { step: 3, title: 'Order Fulfillment', description: 'Integrate logistics and monitor delivery performance.' }
            ],
            faq: [
                { question: 'Is JioMart suitable for grocery sellers?', answer: 'Yes, it’s built for high-volume FMCG and grocery distribution.' },
                { question: 'Do you support vendor portal setup?', answer: 'We handle full portal configuration and training.' }
            ],
            pricing: [
                { plan: 'Essential', price: '₹6,499/month', features: ['Vendor Setup', 'Basic Listings', 'Monthly Summary'] },
                { plan: 'Enterprise', price: '₹18,999/month', features: ['Fulfillment Support', 'Advanced Analytics', 'Weekly Reports'] }
            ]
        }
    },
    {
        id: 8,
        title: 'Nykaa',
        logo: "./services/nykaa.png",
        features: [
            'Beauty Product Onboarding',
            'Brand Page Design',
            'Influencer Campaign Coordination',
        ],
        path: '/nykaa',
        slug: 'nykaa',
        details: {
            overview: 'Nykaa is India’s leading beauty marketplace, and our service helps you launch, brand, and promote your products with style and precision.',
            benefits: [
                { title: 'Beauty-Focused Onboarding', description: 'Tailor your listings for Nykaa’s beauty-savvy audience.' },
                { title: 'Branded Storefronts', description: 'Design immersive brand pages that reflect your aesthetic.' },
                { title: 'Influencer Reach', description: 'Coordinate campaigns with Nykaa’s influencer ecosystem.' }
            ],
            process: [
                { step: 1, title: 'Seller Registration', description: 'Complete Nykaa’s onboarding and brand approval.' },
                { step: 2, title: 'Page Design', description: 'Create a branded storefront with curated visuals and copy.' },
                { step: 3, title: 'Campaign Coordination', description: 'Plan influencer collaborations and seasonal promotions.' }
            ],
            faq: [
                { question: 'Can you help with Nykaa brand page design?', answer: 'Yes, we create visually engaging pages that meet Nykaa’s standards.' },
                { question: 'Do you manage influencer campaigns?', answer: 'We coordinate with Nykaa’s influencer network to boost visibility.' }
            ],
            pricing: [
                { plan: 'Beauty Starter', price: '₹9,499/month', features: ['Product Onboarding', 'Basic Page Design', 'Monthly Report'] },
                { plan: 'Beauty Elite', price: '₹25,999/month', features: ['Influencer Campaigns', 'Advanced Branding', 'Weekly Reports'] }
            ]
        }
    }

]


export const websiteTypes: SubService[] = [
    {
        id: 1,
        title: 'Business Website',
        logo: "./services/businesswebsite.svg",
        features: [
            'Professional Design',
            'Lead Generation Forms',
            'Analytics Integration'
        ],
        path: '/business-website',
        slug: 'business-website',
        details: {
            overview: 'Our Business Website service helps companies establish a credible online presence with a professional design and lead-focused architecture.',
            benefits: [
                { title: 'Brand Credibility', description: 'Build trust with a clean, modern design tailored to your industry.' },
                { title: 'Lead Generation', description: 'Capture potential clients with strategically placed forms and CTAs.' },
                { title: 'Performance Insights', description: 'Track visitor behavior and conversions with integrated analytics.' }
            ],
            process: [
                { step: 1, title: 'Requirement Gathering', description: 'Understand your business goals and target audience.' },
                { step: 2, title: 'Design & Development', description: 'Create a responsive, SEO-friendly website with lead capture tools.' },
                { step: 3, title: 'Launch & Analytics', description: 'Deploy the site and integrate tracking tools for performance monitoring.' }
            ],
            faq: [
                { question: 'Can I update content myself?', answer: 'Yes, we provide a CMS backend for easy content management.' },
                { question: 'Do you offer hosting?', answer: 'We assist with hosting setup or deploy on your preferred provider.' }
            ],
            pricing: [
                { plan: 'Starter', price: '₹14,999', features: ['5 Pages', 'Lead Form', 'Basic SEO'] },
                { plan: 'Professional', price: '₹29,999', features: ['10+ Pages', 'Analytics Setup', 'CMS Access'] }
            ]
        }
    },
    {
        id: 2,
        title: 'E-commerce Website',
        logo: "./services/ecommercewebsite.svg",
        features: [
            'Product Catalog Management',
            'Shopping Cart Integration',
            'Payment Gateway Setup'
        ],
        path: '/ecommerce-website',
        slug: 'ecommerce-website',
        details: {
            overview: 'Our E-commerce Website service enables businesses to sell online with a secure, scalable, and user-friendly storefront.',
            benefits: [
                { title: 'Online Sales Enablement', description: 'Launch a full-featured store with cart, checkout, and payment integration.' },
                { title: 'Inventory Control', description: 'Manage products, stock levels, and categories with ease.' },
                { title: 'Secure Transactions', description: 'Integrate trusted payment gateways for smooth customer experience.' }
            ],
            process: [
                { step: 1, title: 'Store Planning', description: 'Define product structure, categories, and user flow.' },
                { step: 2, title: 'Development & Integration', description: 'Build the store and connect payment, shipping, and inventory systems.' },
                { step: 3, title: 'Launch & Training', description: 'Deploy the site and train your team to manage orders and updates.' }
            ],
            faq: [
                { question: 'Can I manage products myself?', answer: 'Yes, we provide a dashboard for product and order management.' },
                { question: 'Which payment gateways do you support?', answer: 'We support Razorpay, Stripe, Paytm, and more.' }
            ],
            pricing: [
                { plan: 'Basic Store', price: '₹24,999', features: ['Up to 50 Products', 'Cart & Checkout', 'Payment Integration'] },
                { plan: 'Advanced Store', price: '₹49,999', features: ['Unlimited Products', 'Custom Features', 'Marketing Tools'] }
            ]
        }
    },
    {
        id: 3,
        title: 'Real Estate Website',
        logo: "./services/realestatewebsite.svg",
        features: [
            'Property Listings',
            'Virtual Tours',
            'Lead Capture Forms'
        ],
        path: '/real-estate-website',
        slug: 'real-estate-website',
        details: {
            overview: 'Our Real Estate Website service helps agencies showcase properties with immersive visuals and lead capture tools.',
            benefits: [
                { title: 'Property Showcase', description: 'Display listings with images, videos, and virtual tours.' },
                { title: 'Lead Conversion', description: 'Capture buyer interest with inquiry forms and contact CTAs.' },
                { title: 'Location-Based Search', description: 'Enable users to filter listings by city, price, and amenities.' }
            ],
            process: [
                { step: 1, title: 'Listing Strategy', description: 'Plan property categories and search filters.' },
                { step: 2, title: 'Design & Upload', description: 'Create listing templates and upload property data.' },
                { step: 3, title: 'Lead Funnel Setup', description: 'Integrate forms and CRM for lead tracking.' }
            ],
            faq: [
                { question: 'Can I add properties myself?', answer: 'Yes, we provide a backend for listing management.' },
                { question: 'Do you support map-based search?', answer: 'Absolutely. We can integrate Google Maps or custom solutions.' }
            ],
            pricing: [
                { plan: 'Agent Site', price: '₹19,999', features: ['Up to 20 Listings', 'Lead Forms', 'Map Integration'] },
                { plan: 'Agency Portal', price: '₹39,999', features: ['Unlimited Listings', 'Virtual Tours', 'CRM Integration'] }
            ]
        }
    },
    {
        id: 4,
        title: 'Education Website',
        logo: "./services/educationwebsite.svg",
        features: [
            'Course Management',
            'Student Enrollment',
            'Progress Tracking'
        ],
        path: '/education-website',
        slug: 'education-website',
        details: {
            overview: 'Our Education Website service helps institutions deliver online learning with course management and student tracking tools.',
            benefits: [
                { title: 'Digital Learning Hub', description: 'Host courses, materials, and assessments in one place.' },
                { title: 'Enrollment Automation', description: 'Allow students to register and pay online.' },
                { title: 'Progress Monitoring', description: 'Track student activity, submissions, and performance.' }
            ],
            process: [
                { step: 1, title: 'Platform Planning', description: 'Define course structure and user roles.' },
                { step: 2, title: 'Development & Upload', description: 'Build the platform and upload course content.' },
                { step: 3, title: 'Launch & Support', description: 'Deploy the site and provide admin training.' }
            ],
            faq: [
                { question: 'Can I manage courses myself?', answer: 'Yes, we provide a dashboard for course creation and updates.' },
                { question: 'Do you support online payments?', answer: 'Yes, we integrate payment gateways for enrollment fees.' }
            ],
            pricing: [
                { plan: 'Basic LMS', price: '₹17,999', features: ['5 Courses', 'Enrollment Forms', 'Progress Tracking'] },
                { plan: 'Advanced LMS', price: '₹39,999', features: ['Unlimited Courses', 'Quizzes & Certificates', 'Admin Dashboard'] }
            ]
        }
    }
]
