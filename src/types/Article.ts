export type Source = 'nytimes' | 'newsapi' | 'theguardian';

export interface Article {
  title: string;
  description: string;
  url: string;
  source: Source;
  author?: string;
  publishedAt: string;
  urlToImage?: string;
  category?: string;
}
