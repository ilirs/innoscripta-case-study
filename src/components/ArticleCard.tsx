import React from 'react';
import { Article } from 'types/Article';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <article className="flex flex-col items-start justify-between">
    <div className="relative w-full">
      <img
        src={article?.urlToImage}
        alt=""
        className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
    </div>
    <div className="max-w-xl">
      <div className="mt-8 flex items-center gap-x-4 text-xs">
        <span className="text-gray-500">{article?.publishedAt}</span>
        <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          {article?.source}
        </span>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          <span className="absolute inset-0"></span>
          {article?.title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
          {article?.description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          src={article?.urlToImage}
          alt=""
          className="size-10 rounded-full bg-gray-100"
        />
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">
            <span className="absolute inset-0"></span>
            {article?.author}
          </p>
        </div>
      </div>
    </div>
  </article>
);

export default ArticleCard;
