import ClientLogo1 from '@/assets/client/client1.png';
import ClientLogo2 from '@/assets/client/client2.png';
import ClientLogo3 from '@/assets/client/client3.png';
import ClientLogo4 from '@/assets/client/client4.png';
import type { StaticImageData } from 'next/image';

interface Client {
  id: number;
  name: string;
  logo: StaticImageData;
  project: string;
  testimonial: string;
}

export const clients: Client[] = [
   {
    id: 1,
    name: 'Sharma Interiors',
    logo: ClientLogo1,
    project: 'Corporate Office Interior',
    testimonial:
      'The team delivered a sleek, functional workspace that reflects our brand’s professionalism. Truly impressive execution.',
  },
  {
    id: 2,
    name: 'Sah Constructions',
    logo: ClientLogo2,
    project: 'Laboratory Infrastructure',
    testimonial:
      'Precision and compliance were key, and they nailed both. Our lab setup is efficient, clean, and future-ready.',
  },
  {
    id: 3,
    name: 'Achintya Enterprises',
    logo: ClientLogo3,
    project: 'Ayurvedic Manufacturing Facility',
    testimonial:
      'Their understanding of industrial needs and traditional aesthetics was remarkable. A seamless blend of heritage and utility.',
  },
  {
    id: 4,
    name: 'SL Engineerings',
    logo: ClientLogo4,
    project: 'Healthcare Office Interior',
    testimonial:
      'Smart layouts and calming design elements made our healthcare space both functional and welcoming. Highly recommended.',
  },
];
