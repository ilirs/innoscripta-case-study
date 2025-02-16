import { FetchStrategy } from '.';
import { Article } from 'types/Article';
import { Params } from '@/types/QueryParams';
import { Category } from 'utils/categories';

const GUARDIAN_URL = 'https://content.guardianapis.com/search';

const mapCategories: Record<Category, string> = {
  world_news: 'world',
  politics: 'politics',
  business_finance: 'business',
  technology: 'technology',
  sports: 'sport',
  science: 'science',
  education: 'education',
  environment: 'environment',
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

    const response = await fetch(
      `${GUARDIAN_URL}?${queryParams}&show-fields=thumbnail`
    );
    const data = await response.json();

    return data?.response?.results?.map((article: any) => ({
      source: 'theguardian',
      author: 'Unknown',
      title: article.webTitle || '',
      description: '',
      url: article.webUrl,
      urlToImage: article?.fields?.thumbnail,
      publishedAt: article?.webPublicationDate,
      content: null,
      category: article.pillarName,
    }));
  }
}
