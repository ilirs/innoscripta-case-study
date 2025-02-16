import { Article } from '../types/Article';
import { Params } from '../types/Params';

export interface FetchStrategy {
  fetchArticles(params: Params): Promise<Article[]>;
}

export class FetchContext {
  private strategies: FetchStrategy[] = [];

  addStrategy(strategy: FetchStrategy) {
    this.strategies.push(strategy);
  }

  async fetchAllArticles(params: Params): Promise<Article[]> {
    const allArticles = await Promise.all(
      this.strategies.map((strategy) => strategy.fetchArticles(params))
    );

    return allArticles.flat();
  }
}
