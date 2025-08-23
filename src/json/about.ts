// features.ts

export type Feature = {
  title: string
  description: string
  icon: string // You could use a union of emoji strings if you want stricter control
}

export const features: Feature[] = [
  {
    title: 'Business Solutions',
    description: 'Custom websites, portfolios, and digital cards for modern businesses',
    icon: '💼'
  },
  {
    title: 'Educational Tools',
    description: 'Professional resumes and portfolio websites for students and educators',
    icon: '🎓'
  },
  {
    title: 'Event Services',
    description: 'Digital solutions for birthdays, weddings, and special occasions',
    icon: '🎉'
  }
]
