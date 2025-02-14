import { FetchStrategy } from '.';
import { Article } from '../types/Article';
import { Params } from '../types/params';

const NY_TIMES_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export class NYTimesStrategy implements FetchStrategy {
  async fetchArticles(params: Params): Promise<Article[]> {
    const queryParams = new URLSearchParams({
      'api-key': process.env.REACT_APP_NYTIMESAPI_KEY!,
      q: params.q || 'apple',
      news_desk: params.category || '',
      //   source: params.source || 'The New York Times',
    }).toString();

    const response = await fetch(`${NY_TIMES_URL}?${queryParams}`);
    const data = await response.json();

    return data?.response?.docs?.map((article: any) => ({
      source: 'nytimes',
      author: article.byline?.original || 'Unknown',
      title: article.headline?.main || '',
      description: article.abstract || '',
      url: article.web_url,
      urlToImage:
        article.multimedia?.find((media: any) => media.subtype === 'xlarge')
          ?.url || null,
      publishedAt: article.pub_date,
      content: null,
      category: article.news_desk,
    }));
  }
}
