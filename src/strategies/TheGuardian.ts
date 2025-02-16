import { FetchStrategy } from '.';
import { Article } from '../types/Article';
import { Params } from '../types/Params';
import { Category } from '../utils/categories';

const GUARDIAN_URL = 'https://content.guardianapis.com/search';

const mapCategories: Record<Category, string> = {
  world_news: 'world',
  politics: 'politics',
  business_finance: 'business',
  technology: 'technology',
  sports: 'sport',
  entertainment: 'culture',
  science: 'science',
  health_wellness: 'wellness',
  lifestyle: 'lifeandstyle',
  education: 'education',
  environment: 'environment',
  crime_justice: 'law',
  opinion_editorials: 'commentisfree',
  technology_trends: 'technology',
};

export class TheguardianStrategy implements FetchStrategy {
  async fetchArticles(params: Params): Promise<Article[]> {
    const urlQueryParams = new URLSearchParams({
      'api-key': process.env.REACT_APP_THEGUARDIAN_KEY!,
    });

    if (params.category) {
      urlQueryParams.append('section', mapCategories[params.category]);
    }

    if (params.q) {
      urlQueryParams.append('q', params.q);
    }

    if (params.from) {
      urlQueryParams.append(
        'from-date',
        params.from.toISOString().split('T')[0]
      );
    }

    if (params.to) {
      urlQueryParams.append('to-date', params.to.toISOString().split('T')[0]);
    }

    const queryParams = urlQueryParams.toString();

    const response = await fetch(`${GUARDIAN_URL}?${queryParams}`);
    const data = await response.json();

    return data?.response?.results?.map((article: any) => ({
      source: 'theguardian',
      author: 'Unknown',
      title: article.webTitle || '',
      description: '',
      url: article.webUrl,
      urlToImage: null,
      publishedAt: article?.webPublicationDate,
      content: null,
      category: article.pillarName,
    }));
  }
}
