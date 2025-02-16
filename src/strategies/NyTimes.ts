import { FetchStrategy } from '.';
import { Article } from 'types/Article';
import { Params } from '@/types/QueryParams';

const NY_TIMES_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const NY_WEB_URL = 'https://www.nytimes.com/';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
};

export class NYTimesStrategy implements FetchStrategy {
  async fetchArticles(params: Params): Promise<Article[]> {
    const urlQueryParams = new URLSearchParams({
      'api-key': process.env.REACT_APP_NYTIMESAPI_KEY!,
      news_desk: params.category || '',
      //   source: params.source || 'The New York Times',
    });

    if (params.q) {
      urlQueryParams.append('q', params.q);
    }

    // if (params.category) {
    //   urlQueryParams.append('section', mapCategories[params.category]);
    // }

    if (params.from) {
      urlQueryParams.append('begin_date', formatDate(params.from));
    }

    if (params.to) {
      urlQueryParams.append('end_date', formatDate(params.to));
    }

    const queryParams = urlQueryParams.toString();

    const response = await fetch(`${NY_TIMES_URL}?${queryParams}`);
    const data = await response.json();

    return data?.response?.docs?.map((article: any) => ({
      source: 'nytimes',
      author: article.byline?.original || 'Unknown',
      title: article.headline?.main || '',
      description: article.abstract || '',
      url: article.web_url,
      urlToImage:
        `${NY_WEB_URL}/${
          article.multimedia?.find((media: any) => media.subtype === 'xlarge')
            ?.url
        }` || null,
      publishedAt: article.pub_date,
      content: null,
      category: article.news_desk,
    }));
  }
}
