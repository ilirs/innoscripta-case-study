export const categories = [
  {
    id: 'world_news',
    name: 'World News',
    description:
      'Coverage of global events, politics, and international relations.',
  },
  {
    id: 'politics',
    name: 'Politics',
    description:
      'Updates on government policies, elections, and political debates.',
  },
  {
    id: 'business_finance',
    name: 'Business & Finance',
    description: 'News about markets, companies, startups, and the economy.',
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Innovations, gadgets, software, AI, and the tech industry.',
  },
  {
    id: 'sports',
    name: 'Sports',
    description:
      'Updates on football, basketball, cricket, and other sports events.',
  },
  {
    id: 'science',
    name: 'Science',
    description:
      'Breakthroughs in physics, biology, space exploration, and research.',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Updates on schools, colleges, exams, and learning resources.',
  },
  {
    id: 'environment',
    name: 'Environment',
    description:
      'Climate change, conservation efforts, and sustainability news.',
  },
] as const;

export type Category = (typeof categories)[number]['id'];
