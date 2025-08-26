// Example imports — adjust paths to match your actual image locations
import ProImage1 from '../assets/projects/pro1.jpg';
import ProImage2 from '../assets/projects/pro2.png';
import ProImage3 from '../assets/projects/pro3.png';

import type { StaticImageData } from 'next/image';

export interface WorkProject {
  id: number;
  title: string;
  category: string;
  image: StaticImageData;
  description: string;
  link: string;
}

export const workProjects: WorkProject[] = [
  {
    id: 1,
    title: 'Business Portfolio',
    category: 'business',
    image: ProImage1,
    description: 'Modern business portfolio website with dynamic features',
    link: '/projects/portfolio',
  },
  {
    id: 2,
    title: 'Digital Resume Platform',
    category: 'education',
    image: ProImage2,
    description: 'Interactive digital resume builder for professionals',
    link: '/projects/resume',
  },
  {
    id: 3,
    title: 'Wedding Website',
    category: 'events',
    image: ProImage3,
    description: 'Elegant wedding invitation and event management platform',
    link: '/projects/website',
  },
];
