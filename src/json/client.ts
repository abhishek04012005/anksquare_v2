import ClientLogo1 from '@/assets/client/client1.png'
import ClientLogo2 from '@/assets/client/client2.png'
import ClientLogo3 from '@/assets/client/client3.png'
import ClientLogo4 from '@/assets/client/client4.png'
// import Logo1 from '@/assets/work/sharma/logo.png'
// import Website1 from '@/assets/work/sharma/website.png'
// import Card1 from '@/assets/work/sharma/card.png'
// import Logo2 from '@/assets/work/sah/logo.png'
// import Website2 from '@/assets/work/sah/website.png'
// import Logo3 from '@/assets/work/achintya/logo.png'
// import Website3 from '@/assets/work/achintya/website.png'
// import Card3 from '@/assets/work/achintya/card.png'
// import Logo4 from '@/assets/work/sl/logo.png'
// import Website4 from '@/assets/work/sl/website.png'
import Logo2 from "../assets/client/sah-constructions/logo.svg"
import VisitingCard2 from "../assets/client/sah-constructions/visitingcard.svg"
import Website2 from "../assets/client/sah-constructions/website.png"
import type { StaticImageData } from 'next/image'

export interface ProjectWork {
  type: 'logo' | 'website' | 'visitingCard' | 'profile' | 'business'
  title: string
  description: string
  images?: StaticImageData[]
  url?: string
  presentationUrl?: string
}

export interface Client {
  id: number
  name: string
  logo: StaticImageData
  project: string
  testimonial: string
  slug: string
  workDone: ProjectWork[]
}

export const clients: Client[] = [
  {
    id: 1,
    name: 'Sharma Interiors',
    slug: 'sharma-interiors',
    logo: ClientLogo1,
    project: 'Corporate Office Interior',
    testimonial: 'The team delivered a sleek, functional workspace that reflects our brand’s professionalism. Truly impressive execution.',
    workDone: [
      {
        type: 'logo',
        title: 'Brand Identity Design',
        description: 'Modern and sophisticated logo design reflecting corporate values and expertise in interior design.',
        images: [ClientLogo4],
      },
      {
        type: 'website',
        title: 'Corporate Website',
        description: 'Responsive business website with portfolio showcase, project gallery, and client testimonials.',
        images: [ClientLogo4],
        url: 'https://sharma-interiors.com',
      },
      {
        type: 'visitingCard',
        title: 'Business Card Design',
        description: 'Elegant business card design with modern typography and brand elements.',
        images: [ClientLogo4],
      },
      {
        type: 'profile',
        title: 'Company Profile',
        description: 'Digital company profile presentation highlighting services and achievements.',
        presentationUrl: 'https://www.canva.com/design/sharma-interiors/embed',
      },
    ],
  },
  {
    id: 2,
    name: 'Sah Constructions',
    slug: 'sah-constructions',
    logo: ClientLogo2,
    project: 'Laboratory Infrastructure',
    testimonial: 'Precision and compliance were key, and they nailed both. Our lab setup is efficient, clean, and future-ready.',
    workDone: [
      {
        type: 'logo',
        title: 'Construction Brand Logo',
        description: 'Strong and professional logo design representing construction expertise.',
        images: [Logo2],
      },
      {
        type: 'website',
        title: 'Company Website',
        description: 'Dynamic website showcasing construction projects and capabilities.',
        images: [Website2],
        url: 'https://www.sahconstructions.com',
      },
       {
        type: 'visitingCard',
        title: 'Business Card Design',
        description: 'Elegant business card design with modern typography and brand elements.',
        images: [VisitingCard2],
      },
      {
        type: 'business',
        title: 'Business Analysis',
        description: 'Comprehensive business strategy and market analysis report.',
        presentationUrl: 'https://www.canva.com/design/DAGwgeklyeU/IlGwBotTtDGvBn16-HdYUQ/view?embed',
      }
    ],
  },
  {
    id: 3,
    name: 'Achintya Enterprises',
    slug: 'achintya-enterprises',
    logo: ClientLogo3,
    project: 'Ayurvedic Manufacturing Facility',
    testimonial: 'Their understanding of industrial needs and traditional aesthetics was remarkable. A seamless blend of heritage and utility.',
    workDone: [
      {
        type: 'logo',
        title: 'Ayurvedic Brand Identity',
        description: 'Traditional yet modern logo design for ayurvedic products.',
        images: [ClientLogo4],
      },
      {
        type: 'website',
        title: 'E-commerce Website',
        description: 'Full-featured online store with product catalog and ordering system.',
        images: [ClientLogo4],
        url: 'https://achintya-ayurveda.com',
      },
      {
        type: 'visitingCard',
        title: 'Corporate Stationery',
        description: 'Complete business stationery design including cards and letterheads.',
        images: [ClientLogo4],
      },
      {
        type: 'profile',
        title: 'Product Catalog',
        description: 'Digital catalog featuring product range and benefits.',
        presentationUrl: 'https://www.canva.com/design/achintya-catalog/embed',
      },
    ],
  },
  {
    id: 4,
    name: 'SL Engineerings',
    slug: 'sl-engineerings',
    logo: ClientLogo4,
    project: 'Healthcare Office Interior',
    testimonial: 'Smart layouts and calming design elements made our healthcare space both functional and welcoming. Highly recommended.',
    workDone: [
      {
        type: 'logo',
        title: 'Engineering Brand Logo',
        description: 'Technical and precise logo design for engineering firm.',
        images: [ClientLogo4],
      },
      {
        type: 'website',
        title: 'Professional Website',
        description: 'Technical portfolio website with project case studies.',
        images: [ClientLogo4],
        url: 'https://sl-engineerings.com',
      },
      {
        type: 'business',
        title: 'Business Profile',
        description: 'Detailed business profile and service offerings document.',
        presentationUrl: 'https://www.canva.com/design/sl-profile/embed',
      },
    ],
  },
]
