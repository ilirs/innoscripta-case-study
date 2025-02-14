import { FetchStrategy } from './index';
import { Article } from '../types/Article';
import { Params } from '../types/params';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export class NewsAPIStrategy implements FetchStrategy {
  async fetchArticles(params: Params): Promise<Article[]> {
    const queryParams = new URLSearchParams({
      apiKey: process.env.REACT_APP_NEWSAPI_KEY!,
      q: params.q || 'apple',
      //   from: params.date || '',
      //   source: params.source,
    }).toString();

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
