export interface ProjectWork {
  type:  'logo' | 'website' | 'visitingCard' | 'profile' | 'business' | 'letterHead'
  title: string
  description: string
  images?: string[]
  url?: string
  presentationUrl?: string
}

export interface Client {
  id: number
  name: string
  logo: string
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
    logo: "./client/client1.png",
    project: 'Corporate Office Interior',
    testimonial: 'The team delivered a sleek, functional workspace that reflects our brand’s professionalism. Truly impressive execution.',
    workDone: [
      {
        type: 'logo',
        title: 'Brand Identity Design',
        description: 'Modern and sophisticated logo design reflecting corporate values and expertise in interior design.',
        images: ["./client/client1.png"],
      },
      {
        type: 'website',
        title: 'Corporate Website',
        description: 'Responsive business website with portfolio showcase, project gallery, and client testimonials.',
        images: ["./client/sharma-interiors/website.png"],
        url: 'https://abhishek04012005.github.io/interiorssharma/',
      },
      {
        type: 'visitingCard',
        title: 'Business Card Design',
        description: 'Elegant business card design with modern typography and brand elements.',
        images: ["./client/sharma-interiors/visitingcard.png"],
      },
      {
        type: 'profile',
        title: 'Company Profile',
        description: 'Digital company profile presentation highlighting services and achievements.',
        presentationUrl: 'https://www.canva.com/design/DAGvBZodBng/_nXWUjFtxWzCTWjYi_ID_Q/view?embed',
      },
    ],
  },
  {
    id: 2,
    name: 'Sah Constructions',
    slug: 'sah-constructions',
    logo: "./client/client2.png",
    project: 'Laboratory Infrastructure',
    testimonial: 'Precision and compliance were key, and they nailed both. Our lab setup is efficient, clean, and future-ready.',
    workDone: [
      {
        type: 'logo',
        title: 'Construction Brand Logo',
        description: 'Strong and professional logo design representing construction expertise.',
        images: ["./client/client2.png"],
      },
      {
        type: 'website',
        title: 'Company Website',
        description: 'Dynamic website showcasing construction projects and capabilities.',
        images: ["./client/sah-constructions/website.png"],
        url: 'https://www.sahconstructions.com',
      },
       {
        type: 'visitingCard',
        title: 'Business Card Design',
        description: 'Elegant business card design with modern typography and brand elements.',
        images: ["./client/sah-constructions/visitingcard.png"],
      },
      {
        type: 'profile',
        title: 'Company Profile',
        description: 'Digital company profile presentation highlighting services and achievements.',
        presentationUrl: 'https://www.canva.com/design/DAGwgeklyeU/IlGwBotTtDGvBn16-HdYUQ/view?embed',
      },
       {
        type: 'letterHead',
        title: 'Company Letter Head',
        description: 'Elegant Letter Head for Company.',
        images: ["./client/sah-constructions/letterhead.png"],
      },
    ],
  },
  {
    id: 3,
    name: 'Achintya Enterprises',
    slug: 'achintya-enterprises',
    logo: "./client/client3.png",
    project: 'Ayurvedic Manufacturing Facility',
    testimonial: 'Their understanding of industrial needs and traditional aesthetics was remarkable. A seamless blend of heritage and utility.',
    workDone: [
      {
        type: 'logo',
        title: 'Ayurvedic Brand Identity',
        description: 'Traditional yet modern logo design for ayurvedic products.',
        images: ["./client/client3.png"],
      },
      {
        type: 'website',
        title: 'Construction Website',
        description: 'Full-featured online store with product catalog and ordering system.',
        images: ["./client/achintya-enterprises/website.png"],
        url: 'https://achintya-ayurveda.com',
      },
      {
        type: 'visitingCard',
        title: 'Corporate Stationery',
        description: 'Complete business stationery design including cards and letterheads.',
        images: ["./client/achintya-enterprises/visitingcard.png"],
      },
      {
        type: 'profile',
        title: 'Product Catalog',
        description: 'Digital catalog featuring product range and benefits.',
        presentationUrl: 'https://www.canva.com/design/DAGwC4sC8zE/UW060n74lo-LIMRwoDsNWQ/view?embed',
      },
    ],
  },
  {
    id: 4,
    name: 'SL Engineerings',
    slug: 'sl-engineerings',
    logo: "./client/client4.png",
    project: 'Healthcare Office Interior',
    testimonial: 'Smart layouts and calming design elements made our healthcare space both functional and welcoming. Highly recommended.',
    workDone: [
      {
        type: 'logo',
        title: 'Engineering Brand Logo',
        description: 'Technical and precise logo design for engineering firm.',
        images: ["./client/client4.png"],
      },
      {
        type: 'website',
        title: 'Professional Website',
        description: 'Technical portfolio website with project case studies.',
        images: ["./client/sl-engineers/website.png"],
        url: 'https://sl-engineerings.com',
      },
        {
        type: 'visitingCard',
        title: 'Corporate Stationery',
        description: 'Complete business stationery design including cards and letterheads.',
        images: ["./client/sl-engineers/visitingcard.png"],
      },
      {
        type: 'profile',
        title: 'Business Profile',
        description: 'Detailed business profile and service offerings document.',
        presentationUrl: 'https://www.canva.com/design/DAGwn1OnOZ0/oaWHELo73crylszVL19auQ/view?embed',
      },
    ],
  },
]
