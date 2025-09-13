
export const projectCategories = [
  { id: 'all', name: 'All Works' },
  { id: 'logo', name: 'Brand Identity' },
  { id: 'website', name: 'Websites' },
  { id: 'visitingCard', name: 'Business Cards' },
  { id: 'profile', name: 'Company Profiles' },
  { id: 'letterHead', name: 'Letter Heads' }
]

export type ProjectCategory = typeof projectCategories[number]['id']