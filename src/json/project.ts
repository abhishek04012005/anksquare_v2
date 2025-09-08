export interface WorkProject {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
}

export const workProjects: WorkProject[] = [
  {
    id: 1,
    title: 'Business Portfolio',
    category: 'business',
    image: "./projects/pro1.jpg",
    description: 'Modern business portfolio website with dynamic features',
    link: '/projects/portfolio',
  },
  {
    id: 2,
    title: 'Digital Resume Platform',
    category: 'education',
    image: "./projects/pro2.png",
    description: 'Interactive digital resume builder for professionals',
    link: '/projects/resume',
  },
  {
    id: 3,
    title: 'Wedding Website',
    category: 'events',
    image: "./projects/pro3.png",
    description: 'Elegant wedding invitation and event management platform',
    link: '/projects/website',
  },
];
