export interface Certificate {
  id: number;
  title: string;
  image: string;
  alt: string;
  description: string;
  hasViewOption: boolean;
  certificateImage: string;
  certificationDate: string;
  validityDate: string;
  slug: string;
  features: string[];
  logo: string;
}


export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Amazon ATES Partner',
    logo: './services/amazon.png',
    image: './blog/blog1.jpg',
    alt: 'Amazon ATES Certified Partner',
    description: 'Start Your ecommerce business with Certified ATES Amazon Partner',
    hasViewOption: true,
    certificateImage: './blog/blog1.jpg',
    certificationDate: 'January 2024',
    validityDate: 'January 2025',
    slug: 'amazon-ates-partner',
    features: [
      'Official Amazon Technical Service Partner',
      'Certified Account Management',
      'Advanced Selling Capabilities',
      'Direct Amazon Support Access'
    ]
  },
  {
    id: 2,
    title: 'Flipkart Partner',
    logo: './services/flipkart.png',
    image: './certificates/flipkartcertificate.png',
    alt: 'Flipkart Certified Partner',
    description: 'Grow your business with Official Flipkart Partner Services',
    hasViewOption: true,
    certificateImage: './certificates/flipkartcertificate.png',
    certificationDate: 'January 2024',
    validityDate: 'January 2025',
    slug: 'flipkart-partner',
    features: [
      'Certified Flipkart Service Partner',
      'Complete Account Management',
      'Growth & Analytics Support',
      'Priority Seller Support'
    ]
  },
  {
    id: 3,
    title: 'JioMart Partner',
    logo: './services/jiomart.png',
    image: '/images/certificates/jiomart.png',
    alt: 'JioMart Partner Services',
    description: 'Expand your reach with JioMart Partner services',
    hasViewOption: false,
    certificateImage: '/images/certificates/jiomart-full.png',
    certificationDate: 'January 2024',
    validityDate: 'January 2025',
    slug: 'jiomart-partner',
    features: [
      'JioMart Seller Services',
      'Business Development',
      'Catalog Management',
      'Performance Analytics'
    ]
  },
  {
    id: 4,
    title: 'Meesho Partner',
    logo: './services/meesho.png',
    image: '/images/certificates/meesho.png',
    alt: 'Meesho Partner Services',
    description: 'Scale your business with Meesho Partner solutions',
    hasViewOption: false,
    certificateImage: '/images/certificates/meesho-full.png',
    certificationDate: 'January 2024',
    validityDate: 'January 2025',
    slug: 'meesho-partner',
    features: [
      'Meesho Seller Support',
      'Growth Solutions',
      'Inventory Management',
      'Business Analytics'
    ]
  }
];