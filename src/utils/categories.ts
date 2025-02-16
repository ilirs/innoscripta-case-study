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
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Celebrity news, movie releases, TV shows, and awards.',
  },
  {
    id: 'science',
    name: 'Science',
    description:
      'Breakthroughs in physics, biology, space exploration, and research.',
  },
  {
    id: 'health_wellness',
    name: 'Health & Wellness',
    description:
      'Medical news, fitness trends, mental health, and nutrition tips.',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Fashion, travel, food, home decor, and leisure activities.',
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
  {
    id: 'crime_justice',
    name: 'Crime & Justice',
    description:
      'Reports on criminal activities, law enforcement, and court cases.',
  },
  {
    id: 'opinion_editorials',
    name: 'Opinion & Editorials',
    description: 'Columns, analyses, and commentary on various topics.',
  },
  {
    id: 'technology_trends',
    name: 'Technology Trends',
    description: 'AI, cybersecurity, Web3, blockchain, and tech innovations.',
  },
] as const;

export type Category = (typeof categories)[number]['id'];
