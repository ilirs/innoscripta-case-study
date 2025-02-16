import { FetchStrategy } from './index';
import { Article } from '../types/Article';
import { Params } from '../types/Params';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export class NewsAPIStrategy implements FetchStrategy {
  async fetchArticles(params: Params): Promise<Article[]> {
    const urlQueryParams = new URLSearchParams({
      apiKey: process.env.REACT_APP_NEWSAPI_KEY!,
      domains: 'bbc.co.uk',
    });

    // NewsApi doesn't support filter by categories
    // if (params.category) {
    //   urlQueryParams.append('section', mapCategories[params.category]);
    // }

    if (params.q) {
      urlQueryParams.append('q', params.q);
    }

    if (params.from) {
      urlQueryParams.append('from', params.from.toISOString().split('T')[0]);
    }

    if (params.to) {
      urlQueryParams.append('to', params.to.toISOString().split('T')[0]);
    }

    const queryParams = urlQueryParams.toString();

    const response = await fetch(`${NEWS_API_URL}?${queryParams}`);
    const data = await response.json();

    return data.articles.map((article: any) => ({
      source: 'newsapi',
      author: article.author || 'Unknown',
      title: article.title,
      description: article.description || '',
      url: article.url,
      urlToImage: article?.urlToImage || null,
      publishedAt: article.publishedAt,
      content: article.content || null,
    }));
  }
}
